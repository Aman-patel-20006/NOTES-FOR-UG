const mongoose = require("mongoose");
require("dotenv").config(); 
 const url=process.env.URL;
// function conect(){mongoose.connect(url)
//    .then(() => console.log("MongoDB Atlas connected successfully!"))
//   .catch(err => console.error(" Connection error:", err))};
// conect();
function conect(){mongoose.connect("mongodb://localhost:27017/subject")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(" Connection error:", err));}
  conect();
   module.exports={conect,url};