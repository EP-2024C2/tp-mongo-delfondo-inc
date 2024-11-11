const mongoose = require("mongoose");
const MONGO_URL =
  process.env.MONGO_URL ??
  "mongodb://admin:admin1234@localhost:27017/delFondoIncDB?authSource=admin";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión a mongo realizada con exito");
  } catch (err) {
    console.error("Error al conectarse a mongo", err.message);
  }
}

module.exports = { mongoose, connectToDatabase };