
import express from "express";
import createComment from "../../controller/commentController/createComment.js";

const creCOm = express.Router();


creCOm.post("/", createComment);

export default creCOm;
