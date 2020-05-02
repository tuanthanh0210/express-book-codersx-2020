const express = require('express')
const app = express()
const port = 8080
const bodyParser = require("body-parser");

const userRoute = require("./routes/user.route")
const bookRoute = require("./routes/book.route")
const transactionRoute = require("./routes/transaction.route")

app.set('views', './views')
app.set('view engine', 'pug')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get('/', (req, res) => res.render("index"))

app.use('/users', userRoute)
app.use('/books', bookRoute)
app.use('/transactions', transactionRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))