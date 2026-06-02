import {createTransport} from "nodemailer"

const transpoter=createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

export const sendMail=async(req,res)=>{
    try {
    const Mailoptions={
        from:process.env.EMAIL,
        to:"emobronoidea@gmail.com",
        subject:"urikey edho pettali kabatii chesaaa",
        html:`
        <>Dhinni chadivey antha kaligaa unnavaa ??</> `
    }

    await transpoter.sendMail(Mailoptions)
    return res.staus(200).json({
        msg:"Email sent Succesfully "
    })    
    } catch (error) {
        
    }
    
}