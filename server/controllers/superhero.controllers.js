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

module.exports.getSuperheroes = async (req, res, next) => {
  try {
    const {
      query: { page = 1, limit = 5 },
    } = req;

    const superheroes = await Superhero.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Superhero.countDocuments();

    res.send({
      data: superheroes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const { superhero } = req;

    res.send({ data: superhero });
  } catch (error) {
    next(error);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const { superhero, body, files} = req;

    const images = files.map((file) => file.filename);

    superhero.set({ ...body, images });

    const updatedSuperhero = await superhero.save();

    res.send({ data: updatedSuperhero });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {superhero} = req;
    
    await superhero.deleteOne()

    res.send({data: superhero})

  } catch (error) {
    next(error)
  }
};
