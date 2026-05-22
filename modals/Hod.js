import mongoose from "mongoose";

const hodSchema=new mongoose.Schema({
    email:{type:String,required:true},
    department:{type:String,required:true},
    encry_password:{type:String,required:true},
    salt:String     
})

export default mongoose.model("HOD",hodSchema)