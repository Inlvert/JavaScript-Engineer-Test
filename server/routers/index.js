const router = require("express").Router();
const superheroRouter = require("./superheroRouter");

router.use("/superheros", superheroRouter);

module.exports = router;
