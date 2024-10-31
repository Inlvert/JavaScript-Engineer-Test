const superheroRouter = require("express").Router();
const superheroController = require("../controllers/superhero.controllers");
const { imageUpload } = require("../utils/imageUpload");

superheroRouter
  .route("/")
  .post(imageUpload.array("images", 10), superheroController.createSuperhero)
  .get(superheroController.getSuperheroes);

superheroRouter.route("/:superheroId").get(superheroController.getSuperhero);

module.exports = superheroRouter;
