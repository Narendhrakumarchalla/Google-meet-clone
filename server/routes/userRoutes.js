import { Router } from "express";
import { checkAuth, Login, SignUp } from "../controllers/userControllers.js";
import userAuth from "../middlewares/userAuth.js";


const userRoutes = Router()

userRoutes.post('/login', Login)
userRoutes.post('/signup', SignUp)
userRoutes.get('/check', userAuth, checkAuth)


export default userRoutes
