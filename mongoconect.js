const mongoose = require("mongoose");
require("dotenv").config(); 
const url=process.env.URL;
function conect(){mongoose.connect(url)
   .then(() => console.log("MongoDB Atlas connected successfully!"))
  .catch(err => console.error(" Connection error:", err))};
conect();
  module.exports=conect;