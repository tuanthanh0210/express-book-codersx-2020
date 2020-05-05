require("dotenv").config();
const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = process.env.PORT || 8081

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/user.route")
const bookRoute = require("./routes/book.route")
const transactionRoute = require("./routes/transaction.route")
const authRoute = require("./routes/auth.route")
const cartRoute = require("./routes/cart.route")

const authMiddleware = require("./middlewares/auth.middleware")
// const sessionMiddleware = require("./middlewares/session.middleware.js");

app.set('views', './views')
app.set('view engine', 'pug')



app.use(bodyParser.json(process.env.SESSION_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static("public"))
// app.use(sessionMiddleware);

app.get('/', (req, res) => res.render("index"))

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/books', bookRoute)
app.use('/transactions',authMiddleware.requireAuth, transactionRoute)
app.use("/auth", authRoute)
// app.use("/cart", cartRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))