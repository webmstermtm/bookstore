const express = require('express');
const { books } = require('../data/books');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

/**
 * Task 1: Get the book list available in the shop - 2 Points
 * GET /books
 */
router.get('/', (req, res) => {
  res.json(books);
});

/**
 * Task 2: Get the books based on ISBN - 2 Points
 * GET /books/isbn/:isbn
 */
router.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: 'book not found' });
  res.json(book);
});

/**
 * Task 3: Get all books by Author - 2 Points
 * GET /books/author/:author
 */
router.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const list = books.filter(b => b.author.toLowerCase() === author);
  res.json(list);
});

/**
 * Task 4: Get all books based on Title - 2 Points
 * GET /books/title/:title
 */
router.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const list = books.filter(b => b.title.toLowerCase().includes(title));
  res.json(list);
});

/**
 * Task 5: Get book Review - 2 Points
 * GET /books/:isbn/reviews
 */
router.get('/:isbn/reviews', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: 'book not found' });
  res.json(book.reviews || {});
});

/**
 * Task 8: Add/Modify a book review - 2 Points
 * Only the logged-in user can add/modify their own review.
 * PUT /books/:isbn/review
 * body: { review: "text" }
 * auth: Bearer token
 */
router.put('/:isbn/review', authRequired, (req, res) => {
  const { review } = req.body || {};
  if (typeof review !== 'string') {
    return res.status(400).json({ error: 'review text required' });
  }
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: 'book not found' });

  if (!book.reviews) book.reviews = {};
  book.reviews[req.user.username] = review;
  res.json({ message: 'review saved', reviews: book.reviews });
});

/**
 * Task 9: Delete book review added by that particular user - 2 Points
 * DELETE /books/:isbn/review
 * auth: Bearer token
 */
router.delete('/:isbn/review', authRequired, (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: 'book not found' });

  if (book.reviews && book.reviews[req.user.username]) {
    delete book.reviews[req.user.username];
    return res.json({ message: 'review deleted', reviews: book.reviews });
  }
  res.status(404).json({ error: 'no review by this user' });
});

module.exports = router;
