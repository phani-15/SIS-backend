import {createTransport} from "nodemailer"
import User from '../modals/user.js'
import crypto from "crypto";  
import {transporter} from '../utils/mails.js' 
const otpStore = new Map();
export const forgotPassword=async (req,res)=>
{
    try{


    const {email}=req.body;
    if(!email)
    {
         return res.status(400).json({ error: "Email is required" });
    }
    const check=await User.findOne({email})
    if(!check)
    {
         return res.status(400).json({ error: "User not found, check the credentials" });
    }
     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpToken = crypto.randomBytes(20).toString("hex");
       otpStore.set(otpToken, {
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP - Student Information System",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
    <h2 style="color: #0056b3;">Faculty Information System</h2>

    <p>Dear Student,</p>

    <p>
      We received a request to reset the password for your
      <strong>Student Information System</strong> account. 
      To proceed with resetting your password, please use the One-Time Password (OTP) provided below:
    </p>

    <div style="background: #f4f6f9; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0;">
      <h1 style="letter-spacing: 5px; font-size: 32px; margin: 0; text-align: center;">
        ${otp}
      </h1>
    </div>

    <p>
      This OTP is valid for <strong>10 minutes</strong>. 
      Do not share it with anyone. For security reasons, the OTP will expire automatically.
    </p>

    

    <br />

    <p>Regards,<br>
    <strong>Student Information System Support Team</strong></p>

    <hr style="margin-top: 30px;">
    <small style="color: #777;">
      This is an automated message. Please do not reply to this email.
    </small>
  </div>
      `,
    });

    return res.json({
      message: "OTP sent successfully",
      otpToken
    });

}
catch (error) {
    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}


export const verifyOtp=async (req,res)=>
{
    try{
        const {otp}=req.body;
        const {otpToken}=req.params
    if (!otp || !otpToken)
      return res.status(400).json({ error: "OTP and token required" });
    const data = otpStore.get(otpToken);
    if (!data)
      return res.status(400).json({ error: "Invalid or expired session" });

    if (data.expiresAt < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    if (data.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    return res.json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }

    }
export const resetPassword=async (req,res)=>
{
    try{
        const { password } = req.body;
    const { otpToken } = req.params;
    if (!otpToken || !password)
      return res.status(400).json({ error: "Token and password required" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    
    const data = otpStore.get(otpToken)
    if (!data)
      return res.status(400).json({ error:"otpstore data was not found !" });

    if (data.expiresAt < Date.now()) {
      otpStore.delete(otpToken);
      return res.status(400).json({ error: "OTP expired" });
    }
    const user=await User.findOne({email:data.email})
     if (!user)  
      return res.status(404).json({ error: "User not found" });
    user.password=password;
    await user.save();
await transporter.sendMail({
      from: process.env.EMAIL,
      to: data.email,
      subject: "Password Reset Successful - Student Information System",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
  <h2 style="color: #28a745;">Faculty Information System</h2>

  <p>Dear Student,</p>

  <p>
    This is to inform you that the password for your
    <strong>Student Information System</strong> account has been
    <strong>successfully changed</strong>.
  </p>

    <div style="background: #f4f6f9; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
    <h3 style="margin: 0; text-align: center; color: #28a745;">
      ✅ Password Updated Successfully
    </h3>
  </div>

  <p>
    You can now log in using your new password.
    If you did <strong>not</strong> perform this action, please contact the support team immediately
    to secure your account.
  </p>

  <br />

  <p>
    Regards,<br>
    <strong>Student Information System Support Team</strong>
  </p>

  <hr style="margin-top: 30px;">
  <small style="color: #777;">
    This is an automated message. Please do not reply to this email.
  </small>
</div>
      `,
    });
    return res.json({
      message: "Password reset successful"
    });

    }
    catch (error) {
    res.status(500).json({ error: `Server error ${error}` });
  }
}
export const changepassword=async (req,res)=>
{
    try{
        const {identifier,oldpassword,newpassword}=req.body
        if (!identifier|!oldpassword|!newpassword) {
  return res.status(400).json({
    error: "All fields are required"
  });
}
const user = await User.findOne({
  $or: [
    { email: identifier },
    { phone: identifier }
  ]
});

if (!user) {
  return res.status(400).json({
    error: "User not found"
  });
}
if (newpassword.length < 8)
      return res
        .status(400)
        .json({ error: "New password must be at least 8 characters long" });
if (!user.authenticate(oldpassword))
      return res.status(400).json({ error: "Old password incorrect" });
user.password=newpassword
await user.save()
return res.status(200).json({
      message: "Password updated successfully"
    });

    }
catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}