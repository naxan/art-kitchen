const express = require('express');
const router = express.Router();

// HOME
router.get('/', (req, res) => {
    res.sendFile('views/home.html', {
        root: __dirname + '/../',
    });
});

// PROFILE
router.get('/profile/:id', (req, res) => {
    res.sendFile('views/profile.html', {
        root: __dirname + '/../',
    });
});

// GENERATOR
router.get('/kitchen', (req, res) => {
    res.sendFile('views/generator.html', {
        root: __dirname + '/../',
    });
});

// FEED
// leaving this empty until reach goals

module.exports = router;