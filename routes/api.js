const express = require('express');
const router = express.Router();

const db = require('../models');

// USER

// GET Index User
router.get('/users', (req, res) => {
    db.User.find({})
        .populate('posts', 'title body description _id')
        .exec((err, allUsers) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(allUsers);
        });
});

// GET Show User
router.get('/users/:id', (req, res) => {
    db.User.findById(req.params.id)
        .populate('posts', 'title body description _id')
        .exec((err, foundUser) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(foundUser);
        });
});

// POST Create User
router.post('/users', (req, res) => {
    db.User.create(req.body, (err, newUser) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        res.json(newUser);
    })
})

// POST

// GET Index
router.get('/posts', (req, res) => {
    db.Post.find({})
        .populate('author', 'username _id')
        .exec((err, allPosts) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(allPosts);
        });
});

// GET Show
router.get('/posts/:id', (req, res) => {
    db.Post.findById(req.params.id)
        .populate('author', 'username _id')
        .exec((err, foundPost) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(foundPost);
        });
});

// POST Create
router.post('/users/:userId/posts', (req, res) => {
    req.body.author = req.params.userId;

    db.Post.create(req.body, (err, newPost) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        db.User.findById(req.params.userId, (err, foundUser) => {
            foundUser.posts.push(newPost);
            foundUser.save((err, savedUser) => {
                if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
            })

            res.json(newPost);
        })
    });
});

// PUT Update
router.put('/users/:userId/posts/:postId', (req, res) => {
    db.Post.findByIdAndUpdate(req.params.postId, req.body, { new: true }, (err, updatedPost) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        res.json(updatedPost);
    })
})

module.exports = router;