import express from "express";
import dotenv from "dotenv";
import Connectdb from "./db.js";
import errorHandler from "./middleWare/errorHandler.js";
import create from "./router/userProfile/createRoute.js";
import getAllUsers from "./router/userProfile/getAllRou.js";
import getById from "./router/userProfile/getbyId.js";
import userUpdate from "./router/userProfile/updateRou.js";
import deleteRouter from "./router/userProfile/deleteRou.js";
import registerRou from "./router/user/registerRou.js";
import loginRou from "./router/user/loginRou.js";
import authToken from "./middleWare/authenticateToken.js";
import userUpd from "./router/user/updateRou.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connectdb();


//userAuth

app.use("/api/v1/auth", registerRou);
app.use("/api/v1/auth", loginRou);
app.use("/api/v1/auth", userUpd)

//userprofile
app.use("/api/v1/user", create);
app.use("/api/v1/user",authToken, getAllUsers);
app.use("/api/v1/user",authToken, getById);
app.use("/api/v1/user",authToken, userUpdate);
app.use("/api/v1/user",authToken, deleteRouter);
app.use(errorHandler);



const Port = process.env.PORT || 2020;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
