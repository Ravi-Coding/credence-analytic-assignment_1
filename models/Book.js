
const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({ // new also can use 
  name: String,
  img : String,
  summary: String,
});

module.exports = mongoose.model("books", bookSchema);  // module:- collection name and schema name ,ok
