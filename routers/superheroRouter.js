const superheroRouter = require("express").Router();
const superheroController = require("../controllers/superhero.controllers");

superheroRouter.route("/").post(superheroController.createSuperhero);

module.exports = superheroRouter;
