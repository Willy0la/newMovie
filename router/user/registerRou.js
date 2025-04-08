import registerUser from "../../controller/user/register.js";
import express from "express"

const registerRou = express.Router()

registerRou.post("/register", registerUser)

export default registerRou