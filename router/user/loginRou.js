import login from "../../controller/user/login.js";
import express from "express"


const loginRou = express.Router()

loginRou.post("/login",  login)

export default loginRou