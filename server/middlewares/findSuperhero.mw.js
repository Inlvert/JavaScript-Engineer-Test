const createHttpError = require("http-errors");
const { Superhero } = require("../models");
const mongoose = require("mongoose");

module.exports.findSuperhero = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;

    if (!mongoose.isValidObjectId(superheroId)) {
      return next(createHttpError(400, "Invalid superhero ID"));
    }

    const superhero = await Superhero.findById(superheroId);

    if (!superhero) {
      return next(createHttpError(404, "Superhero not found"));
    }

    req.superhero = superhero;

    next();

  } catch (error) {
    next(error);
  }
};