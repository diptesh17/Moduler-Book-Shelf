const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const Bookroutes = require("./routes/bookRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/books", Bookroutes);

app.listen(PORT, () => {
  console.log(`Server started on Port : ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB connection issue");
  });
