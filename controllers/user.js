import User from "../modals/user.js"
export const getUserById=async(req,res,next,id)=>{
    User.findById(id)
    next()
}

export const updateUser=async(req,res)=>{}
export const getData=async(req,res)=>{}