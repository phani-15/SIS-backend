import express from "express"
import {loginUser,registerUser} from "../controllers/auth.js"
import { forgotPassword,verifyOtp,resetPassword, changepassword } from "../utils/nodemailer.js"
const router=express.Router()
router.post('/login',loginUser)
router.post('/register',registerUser)


router.post("/forgot-password", forgotPassword);

router.post("/verify-otp/:otpToken", verifyOtp);

router.post("/reset-password/:otpToken", resetPassword);

router.post("/change-password", changepassword);

export default router