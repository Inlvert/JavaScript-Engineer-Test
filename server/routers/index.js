const router = require("express").Router();
const superheroRouter = require("./superheroRouter");

router.use("/superheroes", superheroRouter);

module.exports = router;
