const mongoose = require("mongoose");
const fs = require("node:fs");
const Listings = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected Successfull");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

const listings = JSON.parse(fs.readFileSync("./data.js", "utf8"));

const deleteData = async () => {
  try {
    await Listings.deleteMany();
    console.log("Data Deleted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const importData = async () => {
  try {
    await Listings.create();
    console.log("Data Deleted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
