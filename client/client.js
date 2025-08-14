/**
 * Node.JS program with 4 methods using Axios
 * Task 10: Get all books – Using async callback function
 * Task 11: Search by ISBN – Using Promises
 * Task 12: Search by Author – Using async/await
 * Task 13: Search by Title – Using Promises
 */
const axios = require('axios');

const BASE = 'http://localhost:3000';

// Task 10: async "callback style"
async function getAllBooksCb(cb) {
  try {
    const res = await axios.get(`${BASE}/books`);
    cb(null, res.data);
  } catch (err) {
    cb(err);
  }
}

// Task 11: Promises (.then/.catch)
function searchByISBN(isbn) {
  return axios.get(`${BASE}/books/isbn/${isbn}`).then(r => r.data);
}

// Task 12: async/await
async function searchByAuthor(author) {
  const res = await axios.get(`${BASE}/books/author/${encodeURIComponent(author)}`);
  return res.data;
}

// Task 13: Promises (.then/.catch)
function searchByTitle(title) {
  return axios.get(`${BASE}/books/title/${encodeURIComponent(title)}`).then(r => r.data);
}

// Demo run
(async function main() {
  console.log('--- Task 10: Get all books (callback) ---');
  await new Promise(resolve => {
    getAllBooksCb((err, data) => {
      if (err) console.error(err.message);
      else console.log(data);
      resolve();
    });
  });

  console.log('\n--- Task 11: Search by ISBN (Promises) ---');
  await searchByISBN('978000000002')
    .then(data => console.log(data))
    .catch(err => console.error(err.response ? err.response.data : err.message));

  console.log('\n--- Task 12: Search by Author (async/await) ---');
  try {
    const data = await searchByAuthor('Bob Smith');
    console.log(data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }

  console.log('\n--- Task 13: Search by Title (Promises) ---');
  await searchByTitle('JavaScript')
    .then(data => console.log(data))
    .catch(err => console.error(err.response ? err.response.data : err.message));
})();
