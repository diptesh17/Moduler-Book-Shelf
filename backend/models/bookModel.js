const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Book = mongoose.model("shelf", bookSchema);
module.exports = Book;
