const express = require('express');
const app = express();
const port = 9090;

const dbConnect = require('./config/dbConnect');

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/', require('./routes/book.route'));



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
