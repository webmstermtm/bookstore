const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Book Store API (no DB)' });
});

// Routes
app.use('/auth', authRouter);
app.use('/books', booksRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
