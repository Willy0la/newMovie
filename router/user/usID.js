import userById from "../../controller/user/getUserId.js";

import express from "express"

const idUser = express.Router()

idUser.get("/:id", userById)

export default idUser