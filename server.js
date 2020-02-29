// Initializing
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

// database
const db = require('./models');

// routes
const routes = require('./routes');

// ------ MIDDLEWARE

// serve public assets
app.use(express.static(__dirname + '/public'));

// use bodyParser
app.use(bodyParser.json());

// ------ ROUTES

// views
app.use('/', routes.views);

// api
// app.use('/api/v1', routes.api);

// ------ START SERVER
app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));