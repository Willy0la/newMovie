
import express from "express";
import createComment from "../../controller/commentController/createComment.js";

const creCOm = express.Router();

// Create Comment Route
creCOm.post("/:id", createComment);

export default creCOm;
