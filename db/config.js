const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://harshrajsinha1:anand@cluster0.9k2b55n.mongodb.net/flipkart"
);

if (connect) {
  console.log("server is connected");
}
