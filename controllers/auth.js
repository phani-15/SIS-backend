import User from "../modals/user.js"
import jwt from "jsonwebtoken"
import {expressjwt} from "express-jwt"
import Details from "../modals/excess.js"

export const loginUser=async(req,res)=>{
    const {data,password}=req.body    
    const user=await User.findOne({
        $or:[
            {email:data},
            {phone:data}
        ]
    })
    if(user){
        if (user.authenticate(password)) {
            
            const token=jwt.sign({_id:user._id },process.env.SECRET,{
                algorithm:"HS256",
                expiresIn:"7d"
            })
            res.cookie("token",token,{
                httpOnly:true,
                secure:false, //secure:true, for prod
                samesite:"lax", //samesite:"none", for prod
                maxAge:7*24*60*60*1000
            })
            
        return res.status(200).json({
            msg:"login succesfull",
            token:token,
            userId:user._id
        })
             
        }
        return res.status(400).json({
            error:"login credentials not matched"
        })
    }
    else{
        return res.status(400).json({
            error:"user not found "
        })
    }
}
export const registerUser=async(req,res)=>{
    const {email,phone}=req.body
    const pass=email.slice(0,8)
    const user=await User.create({email,phone,password:pass})
    .then(async (user)=>{
        await Details.create({user:user._id})
            return res.status(200).json({
                msg:"user created succesfully !!"
            })
    })
    .catch(async (err)=>{
        await User.deleteOne({email})
        return res.status(400).json({
            error:err
        })
    })
}
export const logoutUser=async(req,res)=>{
    res.clearCookie("token");
}

export const isSignedin=expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms:["HS256"]
})
export const isAuthenticated=async(req,res ,next)=>{
    const checker=req.profile && req.auth && req.profile._id.toString()===req.auth._id; 
    if (!checker) {
        return res.status(400).json({
            error:"You are not Authenticated"
        });
    }
    next();
}
