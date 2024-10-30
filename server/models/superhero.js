const { Schema, model } = require("mongoose");

const superheroSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
  },
  originDescription: {
    type: String,
  },
  superpowers: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  images: [{ type: String }],
});

const Superhero = model("Superhero", superheroSchema);

module.exports = Superhero;