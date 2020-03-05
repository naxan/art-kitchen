// Initializing
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Initializating for User Auth
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

// Express Session
app.use(session({
    store: new MongoStore({
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/art-kitchen',
    }),
    secret: 'sdbfijfnn4sllaoieurhf93ndklppqksdncbvytyghskfjfhsjdgcausycodfmghkd17dna8',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // one week
    }
}));

// ------ ROUTES

// views
app.use('/', routes.views);

// api
app.use('/api/v1', routes.api);

// ------ START SERVER
app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));