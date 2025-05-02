import express from "express"
import userController from "../controller/userController.js"
import authToken from "../middleWare/authenticateToken.js"


const userRoute = express.Router()

userRoute.get("/", authToken, userController.allGet);
userRoute.get("/:id", authToken, userController.userById); 
userRoute.post("/login", userController.login);
userRoute.post("/refresh", userController.refreshToken); 
userRoute.post("/register", userController.registerUser); 
userRoute.put("/:id", authToken, userController.updateController); 


export default userRoute
