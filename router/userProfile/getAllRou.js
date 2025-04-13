import express from "express"
import getAll from "../../controller/userProfile/getAll.js"

const getAllUsers = express.Router()

getAllUsers.get("/", getAll)

export default getAllUsers