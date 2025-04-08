import express from "express"
import updateUser from "../../controller/userProfile/updateUser.js"

const userUpdate = express.Router()
userUpdate.patch("/:id", updateUser)

export default userUpdate