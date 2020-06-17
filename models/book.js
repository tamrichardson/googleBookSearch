const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: {type: String, required: true},
    img: { data: Buffer, contentType: String },
    url: { type: String,
        required: true,
        unique: true}
  });

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model("Book", bookSchema);

// Export the User model
module.exports = Book;
