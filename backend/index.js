const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.name || !req.body.publishYear) {
      return res.status(400).json({
        success: false,
        data: {},
        message: "Send all required fields",
      });
    }

    const newBook = {
      title: req.body.title,
      name: req.body.name,
      publishYear: req.body.publishYear,
    };

    const result = await Book.create(newBook);
    return res.status(200).json({
      success: true,
      data: result,
      message: "Successfully Added ",
      err: {},
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/books", async (req, res) => {
  const response = await Book.find({});
  return res.status(500).json({
    count: response.length,
    data: response,
  });
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Book.findById(id);
  return res.status(500).json({
    data: response,
  });
});
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
