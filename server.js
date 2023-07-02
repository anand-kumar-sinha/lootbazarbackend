const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const Product = require("./db/Product");
const User = require("./db/User");
app.use(express.json());
app.use(cors());

//creating user
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    res.json("error in creating user");
  }
});

//loginin user
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.json("useremail and password wrong");
    }
  } else {
    res.json("Please Enter useremail and password");
  }
});

//admin login
app.post("/admin/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      if (user.role === "admin") {
        res.send(user);
      } else {
        res.json("Your are not allow to using admin pannel");
      }
    } else {
      res.json("Enter correct username or password");
    }
  } else {
    res.json("please enter username or password");
  }
});

//creating product  --> admin
app.post("/admin/product/add", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.price &&
      req.body.brand &&
      req.body.category &&
      req.body.userId &&
      req.body.productId
    ) {
      const product = Product(req.body);
      let result = await product.save();
      if (result) {
        res.status(200).send(result);
      }
    } else {
      res.json("Please Enter product full details");
    }
  } catch (error) {
    res.json("Please Enter detail care fully or change product ID");
  }
});

//get all products --> user

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.json("No Products Found");
  }
});

//get all products --> admin
app.get("/admin/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.json("No Products Found");
  }
});

//delete products --> admin
app.delete("/admin/product/delete/:id", async (req, res) => {
  try {
    let product = await Product.deleteOne({ _id: req.params.id });
    if (product) {
      res.send("Product deleted successfully");
    } else {
      res.json("product is not deleted");
    }
  } catch (error) {
    res.json("Error in product deleting");
  }
});

//get one product -->admin

app.get("/admin/product/:id", async (req, res) => {

  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.json("product couldnot find");
  }
});


//update product -->admin

app.put('/admin/product/update/:id',async (req, res) =>{
  const product = await Product.updateOne(
    {_id : req.params.id},
    {$set : req.body}
  )
  if(product){
    res.send(product)
  }else{
    res.json('Product not updated')
  }
})


//search product

app.get('/search/:key', async (req, res) =>{
  const product = await Product.find({
    $or : [
      {name : { $regex : req.params.key}},
      {price : { $regex : req.params.key}},
      {brand : { $regex : req.params.key}},
      {category : { $regex : req.params.key}},
    ]
  })

  res.send(product)
})

app.listen(4000);
