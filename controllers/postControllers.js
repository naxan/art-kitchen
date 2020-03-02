const db = require('../models');

const index = (req, res) => {
    db.Post.find({})
        .populate('author', 'username _id')
        .exec((err, allPosts) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(allPosts);
        });
};

const show = (req, res) => {
    db.Post.findById(req.params.id)
        .populate('author', 'username _id')
        .exec((err, foundPost) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(foundPost);
        });
};

const create = (req, res) => {
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
};

const update = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.postId, req.body, { new: true }, (err, updatedPost) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        res.json(updatedPost);
    })
};

const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        res.json(deletedPost);
    })
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}