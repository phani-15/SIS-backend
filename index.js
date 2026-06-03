import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose, { mongo } from "mongoose"
import path, { basename } from "path"

import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js"

const app=express()
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("DB Connection succesfull !");
})
.catch((err)=>{
    console.log(err);
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost::5173"],
    credentials:true
}))

app.use('/uploads',express.static(path.join(process.cwd(),"uploads")))
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',userRoutes)


bodyParser.urlencoded({extended:true})

app.get("/",(req,res)=>{
    res.send("hello from the server !!")
})

app.listen(process.env.PORT,()=>{
    console.log("serever is running on port 5000");
})