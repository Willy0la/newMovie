import login from "../../controller/user/login.js";
import express from "express"
import authToken from "../../middleWare/authenticateToken.js";

const loginRou = express.Router()

loginRou.post("/login",  login)

export default loginRou