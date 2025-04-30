import express from "express"
import userProfileController from "../controller/userProfileController.js"

const profileRouter = express.Router()

profileRouter.post("/create", userProfileController.createNew)
profileRouter.get("/", userProfileController.getAll)
profileRouter.get("/:id", userProfileController.getOne)
profileRouter.delete("/:id", userProfileController.deleteUser)
profileRouter.put("/:id", userProfileController.updateUser)

export default profileRouter;