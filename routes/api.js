const express = require('express');
const router = express.Router();

// const db = require('../models');
const ctrl = require('../controllers');

// USER

router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);

// POST

router.get('/posts', ctrl.posts.index);
router.get('/posts/:id', ctrl.posts.show);
router.post('/users/:userId/posts', ctrl.posts.create);
router.put('/posts/:postId', ctrl.posts.update);
router.delete('/posts/:postId', ctrl.posts.destroy);

module.exports = router;