const express = require('express');
const router = express.Router();

// HOME
router.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname + '/../',
    });
});

// PROFILE
router.get('/profile', (req, res) => {
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
router.get('/feed', (req, res) => {
    res.sendFile('views/feed.html', {
        root: __dirname + '/../'
    });
});


module.exports = router;