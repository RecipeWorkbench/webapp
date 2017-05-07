'use strict';
// Load the things we need.
var express = require('express');
var app = express();

// Set the view engine to EJS.
app.set('view engine', 'ejs');

var port = process.env.PORT || 8081;

app.use('/static', express.static('public'));

// Home page.
app.get('/', function (req, res) {
    res.render('pages/home');
});

app.get('/home', function (req, res) {
    res.render('pages/home');
});

// Recipes page.
app.get('/recipes', function (req, res) {
    res.render('pages/recipes');
});

// Recipe page.
app.get('/recipe', function (req, res) {
    res.render('pages/recipe');
});

// Transform Recipe page.
app.get('/transform-recipe', function (req, res) {
    res.render('pages/transform');
});

// Contribution page.
app.get('/contribution', function (req, res) {
    res.render('pages/contribution');
});

app.listen(port);
console.log("Listening on port: " + port);
