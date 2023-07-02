const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    requied: true,
    unique: true,
  },
  imgUrl: {
    type: String,
    requied: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
