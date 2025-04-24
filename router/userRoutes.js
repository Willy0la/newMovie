import allGet from "../controller/user/getAllss.js"
import express from "express"
import login from "../controller/user/login.js"
import registerUser from "../controller/user/register.js"
import userById from "../controller/user/getUserId.js"
import updateController from "../controller/user/update.js"


const userRoute = express.Router()

userRoute.get("/",  allGet)
userRoute.get("/:id",  userById)
userRoute.post("/login",  login)
userRoute.post("/register",  registerUser)
userRoute.put("/:id",  updateController)

export default userRoute
