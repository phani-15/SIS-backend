import express from "express"
import { isAuthenticated, isSignedin } from "../controllers/auth.js"
import {getDataforAdmin} from "../controllers/admin.js"
const router=express.Router()

router.post('/admin/getData',isSignedin,isAuthenticated,getDataforAdmin)

export default router