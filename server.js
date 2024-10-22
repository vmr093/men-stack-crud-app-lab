const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

const app = express();

// CONTROLLERS

catsCtrl = require('./controllers/cats')

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')))




// GET /
app.get('/', async (req, res) => {
    res.render("index.ejs");
})

// GET /cats
app.get("/cats", catsCtrl.index);

// GET /cats/new
app.get("/cats/new", catsCtrl.new);

// GET /cats/:catID
app.get("/cats/:catId", catsCtrl.get);

// POST /cats
app.post("/cats", catsCtrl.show);

// GET localhost:3000/cats/:catId/edit
app.get("/cats/:catId/edit", catsCtrl.edit);

app.put("/cats/:catId", catsCtrl.update);

app.delete("/cats/:catId", catsCtrl.delete);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});