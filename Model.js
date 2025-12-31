const mongoose = require("mongoose");
const Schemamodel = new mongoose.Schema({
  title:  {
    type: String,
    required: true
  } ,
  src:  {
    type: String,
    required: true
  }
});
const Aec = mongoose.model("Aec", Schemamodel);
const chemistry = mongoose.model("chemistry", Schemamodel);
const physics = mongoose.model("physics", Schemamodel);
const computerscience = mongoose.model("computerscience", Schemamodel);
const manAndEnvironment = mongoose.model("manAndEnvironment", Schemamodel);
const math = mongoose.model("math", Schemamodel);
const secWeb = mongoose.model("secWeb", Schemamodel);
const yoga = mongoose.model("yoga", Schemamodel);
const static=mongoose.model("statistics",Schemamodel);
const ayurveda=mongoose.model("ayurveda",Schemamodel);
module.exports={Aec,chemistry,physics,computerscience,manAndEnvironment,math,secWeb,yoga,static,ayurveda};