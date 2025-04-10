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
import idUser from "./router/user/usID.js";
import findAll from "./router/user/findAll.js";
import creCom from "./router/comment/createCommentRou.js"
import updateRouter from "./router/movies/update.js";
import getRouter from "./router/movies/gAM.js";
import createRouter from "./router/movies/creaMov.js";
import getByIdRouter from "./router/movies/gbyId.js";
import createReviewRouter from "./router/reviews/createReviewRouter.js";
import getReviewsRouter from "./router/reviews/getReviewsRouter.js";
import getReviewByIdRouter from "./router/reviews/getReviewByIdRouter.js";
import updateReviewRouter from "./router/reviews/updateReviewRouter.js";
import deleteReviewRouter from "./router/reviews/deleteReviewRouter.js";
import createGenreRouter from "./router/genre/createRouter.js";
import getGenresRouter from "./router/genre/getRouter.js";
import getGenreByIdRouter from "./router/genre/getSingleRouter.js";
import updateGenreRouter from "./router/genre/updateRouter.js";
import deleteGenreRouter from "./router/genre/deleteRouter.js";
import delComment from "./router/comment/delComRou.js";
import getAllCommRou from "./router/comment/getAllCommentRou.js";
import getSingleCommRou from "./router/comment/getSingleComRou.js";
import updatedComment from "./router/comment/updateCommRou.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connectdb();
//genre
app.use("/api/v1/genres", createGenreRouter);
app.use("/api/v1/genres", getGenresRouter);
app.use("/api/v1/genres", getGenreByIdRouter);
app.use("/api/v1/genres", updateGenreRouter);
app.use("/api/v1/genres", deleteGenreRouter);
//reviews
app.use("/api/v1/reviews", createReviewRouter);
app.use("/api/v1/reviews", getReviewsRouter);
app.use("/api/v1/reviews", getReviewByIdRouter);
app.use("/api/v1/reviews", updateReviewRouter);
app.use("/api/v1/reviews", deleteReviewRouter);
//movie
app.use("/api/v1/movies",createRouter );
app.use("/api/v1/movies", getRouter);
app.use("/api/v1/movies", getByIdRouter);
app.use("/api/v1/movies", updateRouter);
app.use("/api/v1/movies", deleteRouter);

//comment
app.use("/api/v1/comment", creCom);
app.use("/api/v1/comment", delComment);
app.use("/api/v1/comment", getAllCommRou);
app.use("/api/v1/comment", getSingleCommRou);
app.use("/api/v1/comment", updatedComment);

//userAuth

app.use("/api/v1/auth", registerRou);
app.use("/api/v1/auth", loginRou);
app.use("/api/v1/auth", userUpd)
app.use("/api/v1/auth", idUser)
app.use("/api/v1/auth", findAll)

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
