'use strict';
require('dotenv').config()

// Load the things we need.
var express = require('express');
var app = express();

// Set the view engine to EJS.
app.set('view engine', 'ejs');

var port = process.env.PORT || 8081;

app.use('/static', express.static('public'));

// Home page.
app.get('/', function (req, res) {
    res.render('pages/home', { api: process.env.BACKEND });
});

app.get('/home', function (req, res) {
    res.render('pages/home', { api: process.env.BACKEND });
});

// Create recipe page.
app.get('/create-recipe', function (req, res) {
    res.render('pages/create', { api: process.env.BACKEND });
});

// Recipes page.
app.get('/recipes', function (req, res) {
    res.render('pages/recipes', { api: process.env.BACKEND });
});

// Ingredients page.
app.get('/ingredients', function (req, res) {
    res.render('pages/ingredients', { api: process.env.BACKEND });
});

// Compounds page.
app.get('/compounds', function (req, res) {
    res.render('pages/compounds', { api: process.env.BACKEND });
});

// Recipe page.
app.get('/recipe/:id', function (req, res) {
    res.render('pages/recipe', { api: process.env.BACKEND, recipe: req.params.id });
});

// Transform Recipe page.
app.get('/transform-recipe/:id', function (req, res) {
    res.render('pages/transform', { api: process.env.BACKEND, recipe: req.params.id });
});


app.listen(port);
console.log("Listening on port: " + port);
