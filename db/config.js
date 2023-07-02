const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.fnt6b83.mongodb.net/"
);

if (connect) {
  console.log("server is connected");
}
