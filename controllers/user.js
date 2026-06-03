import User from "../modals/user.js"
import Details from "../modals/excess.js"
export const getUserById=async(req,res,next,id)=>{
    const user=await User.findById(id)
    req.profile=user;
    next();
}

export const updateUser=async(req,res)=>{
    const {mode,data}=req.body;    
    switch(mode){
        // 1-profile_update 2-skills_update 3-achievements
        case 2:{
            const id=req.profile._id.toString()            
            await Details.findOneAndUpdate({user:id},{
                $push:{
                    skills:{$each:data}
                }
            })
            .then(()=>{
                return res.status(200).json({
                    msg:"skills added succesfully "
                })
            })
            .catch((err)=>{
                return res.status(400).json({
                    error:err
                })
            })
        }
        case 3:{
            //pending
        }
    }
}
export const getData=async(req,res)=>{
    //get the data from the CAP
    const capData=fetch();
    const data=Details.findOne({user:req.profile._id.toString()})
    const obj={...capData,...data}
    return res.status(200).json({
        data
    })
}