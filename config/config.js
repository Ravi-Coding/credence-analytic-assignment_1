const mongoose = require('mongoose');
require('dotenv').config();

const dbHOST = process.env.DBHOST;

mongoose.connect(dbHOST)
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.error('Error while connecting to MongoDB:', err);
  });

// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/bookstore");