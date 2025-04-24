import express from "express"
import createNew from "../controller/userProfile/createNew.js"
import getAll from "../controller/userProfile/getAll.js"
import getOne from "../controller/userProfile/getOne.js"
import deleteUser from "../controller/userProfile/deleteUser.js"
import updateUser from "../controller/userProfile/updateUser.js"

const profileRouter = express.Router()

profileRouter.post("/create", createNew)
profileRouter.get("/", getAll)
profileRouter.get("/:id", getOne)
profileRouter.delete("/:id", deleteUser)
profileRouter.put("/:id", updateUser)

export default profileRouter;