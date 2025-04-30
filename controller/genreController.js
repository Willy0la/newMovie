import asyncHandler from "express-async-handler";
import Genre from "../model/genre.js";
import constant from "../constants/constant.js";
import mongoose from "mongoose";

const createGenre = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    const error = new Error("Genre name is required.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const existingGenre = await Genre.findOne({ name });
  if (existingGenre) {
    const error = new Error("Genre exists.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const genre = await Genre.create({ name, description });

  res.status(201).json({
    message: "Genre created successfully.",
    genre,
  });
});

const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find();

  res.status(200).json({
    message: "Genres fetched successfully.",
    genres,
  });
});

const getSingleGenre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Bad ID format.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const genre = await Genre.findById(id);

  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  res.status(200).json({
    message: "Genre fetched successfully.",
    genre,
  });
});

const updateGenre = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  genre.name = name || genre.name;
  genre.description = description || genre.description;

  await genre.save();

  res.status(200).json({
    message: "Genre updated successfully.",
    genre,
  });
});

const deleteGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  await genre.deleteOne();

  res.status(200).json({
    message: "Genre deleted successfully.",
  });
});

export default {
  createGenre,
  deleteGenre,
  getGenres,
  getSingleGenre,
  updateGenre,
};
