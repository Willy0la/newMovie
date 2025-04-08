import express from "express"
import getOne from "../../controller/userProfile/getOne.js"

const getById = express.Router()

getById.get("/:id", getOne)

export default getById