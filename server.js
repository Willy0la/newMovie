//dependencies


import dotenv from "dotenv";
dotenv.config();

console.log("Test ACCESS_TOKEN:", process.env.ACCESS_TOKEN); // <--- add this



import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";    // ← add this

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
import refreshToken from "./controller/user/refreshToken.js";



const app = express();




Connectdb();

//middlewares
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//genre


//reviews



//adjusted routes

app.use("/api/v1/movies",authToken, movieRouter );
app.use("/api/v1/comment",authToken,  commentRoute);
app.use("/api/v1/genres", authToken, genreRoute);
app.use("/api/v1/profile", authToken, profileRouter);
app.use("/api/v1/reviews", authToken, reviewRouter);
app.use("/api/v1/user",refreshToken, userRoute);
app.use("/api/v1/user/refresh", refreshToken);




app.use(errorHandler);




const Port = process.env.PORT || 2020;
app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
