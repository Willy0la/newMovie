import express from "express"
import createNew from "../../controller/userProfile/createNew.js"

const create = express.Router()

create.post("/create", createNew)

export default create;