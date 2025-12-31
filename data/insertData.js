const mongoose = require('mongoose');
const conect = require("../mongoconect.js");
conect();
const { Aec, chemistry, physics, computerscience, manAndEnvironment, math, secWeb, yoga, static,ayurveda }= require("../Model.js");
const ayorData = require("./ayorvega.js");
async function insertData() {
    try {
        await  ayurveda.insertMany(ayorData);
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await mongoose.connection.close();
    }
}
insertData();
