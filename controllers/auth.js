import User from "../modals/user.js"

export const loginUser=async(req,res)=>{
    const {data,password}=req.body


}
export const registerUser=async(req,res)=>{
    const {email,phone}=req.body
    const user=await User.create({email,phone})
    .then(()=>{
            
    })
}
export const isSignedin=async(req,res)=>{}
export const isAuthenticated=async(req,res)=>{}

