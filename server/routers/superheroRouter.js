const superheroRouter = require("express").Router();
const superheroController = require("../controllers/superhero.controllers");
const { findSuperhero } = require("../middlewares/findSuperhero.mw");
const { imageUpload } = require("../utils/imageUpload");

superheroRouter
  .route("/")
  .post(imageUpload.array("images", 10), superheroController.createSuperhero)
  .get(superheroController.getSuperheroes);

superheroRouter
  .route("/:superheroId")
  .get(findSuperhero, superheroController.getSuperhero)
  .put(imageUpload.array("images", 10), findSuperhero, superheroController.updateSuperhero);

module.exports = superheroRouter;
