import express from "express"
import userController from "../controller/userController.js"


const userRoute = express.Router()

userRoute.get("/",  userController.allGet)
userRoute.get("/:id",  userController.userById)
userRoute.post("/login", userController.login)
userRoute.post("/login", userController.refreshToken)
userRoute.post("/register",  userController.registerUser)
userRoute.put("/:id",  userController.updateController)

export default userRoute
