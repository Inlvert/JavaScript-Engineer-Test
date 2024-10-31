const { Schema, model } = require("mongoose");

const superheroSchema = new Schema({
  nickname: {
    type: String,
    required: [true, "Nickname is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9]{1,16}$/,
      "Nickname mast be 1-16 symbols and must contain letters and numbers only",
    ],
  },
  realName: {
    type: String,
  },
  originDescription: {
    type: String,
    default:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore accusamus velit unde laboriosam repellendus suscipit nobis rerum libero at, ea neque impedit distinctio obcaecati delectus ipsam nemo ducimus veniam molestiae!",
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
