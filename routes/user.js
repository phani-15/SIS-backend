import express from "express"
import {isAuthenticated, isSignedin, loginUser,registerUser} from "../controllers/auth.js"
import {getData,getUserById,updateUser} from "../controllers/user.js"

const router=express.Router()

router.param("userId",getUserById)

router.post('/login',loginUser)
router.post('/register',registerUser)

router.get('/getData/:userid',isSignedin,getData)
router.put('/update/:userId',isSignedin,isAuthenticated,updateUser)

export default router