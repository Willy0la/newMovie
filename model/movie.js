import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  releaseDate: { type: Date },
  director: { type: String, trim: true },
  genres: [{ type: String, required: true }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], 
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
