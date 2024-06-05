const express = require('express');
require('dotenv').config();
require('./config/config');  // Ensure this path is correct

const Book = require('./models/Book');  // Ensure this path is correct

const app = express();

const port = process.env.PORT || 3005;

app.use(express.json());

// ************** POST METHOD **************
app.post('/books', async (req, res) => {
  try {
    const data = new Book(req.body);
    const result = await data.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Error saving the book' });
  }
});

// ************* GET ALL METHOD **************
app.get('/books', async (req, res) => {
  try {
    const data = await Book.find();
    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Error fetching books' });
  }
});

// ***************** GET METHOD BY SPECIFIC ID ************
app.get('/books/:id', async (req, res) => {
  try {
    const data = await Book.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Error fetching the book' });
  }
});

// ************ DELETE METHOD **************
app.delete('/books/:id', async (req, res) => {
  try {
    const data = await Book.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 0) {
      return res.status(404).send({ message: 'Book not found!' });
    }
    res.send({ message: 'Book deleted successfully', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error deleting the book', error: error.message });
  }
});

// **************** PUT METHOD (Update) **********
app.put('/books/:id', async (req, res) => {
  try {
    const data = await Book.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Error updating the book' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
