import express from "express"

import deleteUser from "../../controller/userProfile/deleteUser.js";

const deleteRouter = express.Router()

deleteRouter.delete("/:id", deleteUser)

export default deleteRouter;