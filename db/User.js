const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 5,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 8,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("users", userSchema);
