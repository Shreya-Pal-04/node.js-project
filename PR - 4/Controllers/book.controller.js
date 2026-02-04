const Book = require('../models/book.model');
const fs = require('fs');
const path = require('path');

// all books
exports.getBooks = async (req, res) =>{
    const books = await Book.find();

    let search = req.query.search || "";
    const bookk = await Book.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ]
    });

    res.render('index', { books: bookk, search });
};

// add page
exports.addBookPage = (req, res) =>{
    res.render('add');
};

// add book
exports.addBook = async (req, res) =>{
    const imagePath = req.file ? "uploads/" + req.file.filename : "";

    await Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imagePath 
    });

    res.redirect('/');
};

// edit page
exports.editBookPage = async (req, res) =>{
    const book = await Book.findById(req.params.id);
    if (!book){
        console.log("Book not found");
        return res.redirect('/');
    }
    res.render('edit', { book });
};

// update book
exports.updateBook = async (req, res) =>{
    let book = await Book.findById(req.params.id);
    if(!book){
        console.log("Book not found");
        return res.redirect('/');
    }
    let imagePath = book.image !== undefined ? book.image : "";

    if (req.file) {
        if (book.image !== "") {
            let oldPath = path.join(__dirname, "..", book.image);
            try {
                fs.unlinkSync(oldPath);
            } catch (err) {
                console.log("Old image missing");
            }
        }
        imagePath = `uploads/${req.file.filename}`;
    }

    await Book.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image: imagePath
    });

    res.redirect('/');
};

exports.deleteBook = async (req, res) => {
    id = req.params.id;
    let book = await Book.findById(id);
    if(!book){
        console.log("Book not found");
        return res.redirect('/');
    }

    if (book && book.image !== "") {
        let imagePath = path.join(__dirname, "..", book.image);
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.log("Image not found");
        }
    }
    await Book.findByIdAndDelete(id);
    res.redirect('/');
};