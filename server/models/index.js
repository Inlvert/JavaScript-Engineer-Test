const mongoose = require("mongoose");
const CONSTANTS = require("../constants");
const Superhero = require("./superhero");

async function connectToDB() {
  await mongoose.connect(CONSTANTS.DB_URL);
}

connectToDB().catch((err) => console.log(err));

module.exports = {
  Superhero,
};
