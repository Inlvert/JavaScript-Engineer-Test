const { Superhero } = require("../models");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const images = files.map((file) => file.filename);

    const superhero = await Superhero.create({ ...body, images });

    res.status(201).send({ data: superhero });
    
  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).send({ error: "Nickname must be unique." });
    }

    next(error);
  }
};

module.exports.getSuperheros = async (req, res, next) => {};

module.exports.getSuperhero = async (req, res, next) => {};
module.exports.updateSuperhero = async (req, res, next) => {};
module.exports.deleteSuperhero = async (req, res, next) => {};
