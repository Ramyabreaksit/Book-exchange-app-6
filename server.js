const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// In-memory storage for book listings
let books = [];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Post a new book listing
app.post('/api/books', (req, res) => {
  const { title, author, type, contact } = req.body;
  if (!title || !author || !type || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newBook = {
    id: Date.now(),
    title,
    author,
    type, // "Lend" or "Borrow"
    contact
  };
  books.push(newBook);
  res.json(newBook);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});