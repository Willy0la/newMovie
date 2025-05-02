//dependencies


import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN;
const REFRESH_SECRET = process.env.REFRESH_TOKEN;



if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("Missing access or refresh token secret in environment variables");
}



import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";  
import { EventEmitter } from 'events';
import Connectdb from "./db.js";
import errorHandler from "./middleWare/errorHandler.js";
import authToken from "./middleWare/authenticateToken.js";


//routes
import genreRoute from "./router/genreRouter.js";
import movieRouter from "./router/movieRoute.js";
import commentRoute from "./router/commentRoute.js";
import profileRouter from "./router/profileRoute.js";
import reviewRouter from "./router/reviewRoute.js";
import userRoute from "./router/userRoutes.js";




const app = express();


Connectdb();

//middlewares
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const emitter = new EventEmitter();
emitter.setMaxListeners(20);




app.use("/api/v1/movies",authToken, movieRouter );
app.use("/api/v1/comment",authToken,  commentRoute);
app.use("/api/v1/genres", authToken, genreRoute);
app.use("/api/v1/profile", authToken, profileRouter);
app.use("/api/v1/reviews", authToken, reviewRouter);
app.use("/api/v1/user", userRoute);






app.use(errorHandler);




const Port = process.env.PORT || 2020;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
