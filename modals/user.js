import mongoose from "mongoose";
import {v4} from "uuid"
const {createHmac}=await import('node:crypto') 

const LoginSchema=new mongoose.Schema({
    email:{type:String,required:true,trim:true,unique:true},
    encryPass:{type:String,trim:true},
    phone:{type:String,unique:true,trim:true,required:true},
    salt:{type:String,trim:true}
})

LoginSchema.virtual("password")
.get(function(){
    return this._password
})
.set(function(password){
    this._password=password;
    this.salt=v4()
    this.encryPass=this.encryptPassword(password);
})

LoginSchema.methods={
    authenticate:function(password){
        return this.encryptPassword(password)===this.encryPass
    },
    encryptPassword:function(password){
        if(!password ||!this.salt) return "";
        try {
            return createHmac('sha256',this.salt)
        .update(password)
        .digest('hex')
        } catch (error) {
            
        }
    }
}

export default mongoose.model("User",LoginSchema)