

import express from "express";
import updateController from "../../controller/user/update.js";

const userUpd = express.Router();
userUpd.patch("/:id", updateController);

export default userUpd;
