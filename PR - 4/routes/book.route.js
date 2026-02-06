const express = require('express');
const{uploadImage} = require('../middleware/uploadImage');
const router = express.Router();

const book = require('./controllers/book.controller.js');
const upload = require('../middleware/uploadImage');

router.get('/', book.getBooks);
router.get('/add-book', book.addBookPage);
router.post('/add-book', upload.single('image'), book.addBook);
router.get('/edit/:id', book.editBookPage);
router.post('/update/:id', upload.single('image'), book.updateBook);
router.get('/delete/:id', book.deleteBook);

module.exports = router;