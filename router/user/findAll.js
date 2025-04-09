import allGet from "../../controller/user/getAllss.js"
import express from "express"


const findAll = express.Router()

findAll.get("/",  allGet)

export default findAll
