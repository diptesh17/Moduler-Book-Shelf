const express = require("express");
const Book = require("../models/bookModel");
const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const response = await Book.find({});
    return res.status(500).json({
      count: response.length,
      data: response,
    });
  } catch (error) {
    console.log("Error : not get all book");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Book.findById(id);
    return res.status(500).json({
      data: response,
    });
  } catch (error) {
    console.log("Not able to get a book");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the required fields",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    return res.status(200).send({
      message: "Book is successfully updated",
    });
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    return res.status(200).send({
      message: "Book is successfully deleted",
    });
  } catch (error) {
    console.log("Somwthing went wrong while delete book");
  }
});

module.exports = router;
