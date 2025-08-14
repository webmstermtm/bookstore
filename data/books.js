// In-memory books array
// Each book has: isbn, title, author, reviews (object: { [username]: "text" })
const books = [
  {
    isbn: '978000000001',
    title: 'JavaScript Essentials',
    author: 'Alice Johnson',
    reviews: {
      // "user1": "Great intro!"
    }
  },
  {
    isbn: '978000000002',
    title: 'Node.js in Practice',
    author: 'Bob Smith',
    reviews: {}
  },
  {
    isbn: '978000000003',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    reviews: {}
  },
  {
    isbn: '978000000004',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    reviews: {}
  }
];

module.exports = { books };
