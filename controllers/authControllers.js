// Require
const bcrypt = require('bcryptjs');
const db = require('../models');

// POST Register - User Create
const register = (req, res) => {
    // check if user already exists
    db.User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});
        }

        if (foundUser) {
            console.log(foundUser);
            return res.status(400).json({status: 400, message: 'This username already exists. Please choose a different username.'});
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});
            }

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});
                }

                const {username, email} = req.body;

                const newUser = {
                    username,
                    email,
                    password: hash,
                };

                db.User.create(newUser, (err, createdUser) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});
                    }

                    res.status(201).json({status: 201, message: 'Success'});
                })
            })
        })
    })
};

const login = (req, res) => {
    db.User.findOne({username: req.body.username}, '+password', (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});

        if (!foundUser) return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});

            if (isMatch) {
                const currentUser = {
                    _id: foundUser._id,
                    username: foundUser.username,
                    email: foundUser.email,
                };

                req.session.currentUser = currentUser;
                return res.status(200).json({
                    status: 200,
                    user: currentUser,
                });
            } else {
                return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
            }
        })
    })
};

const logout = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(400).json({status: 400, message: 'Unauthorized, you cannot logout when not logged in.'});
    }

    req.session.destroy((err) => {
        if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});

        res.json({status: 200});
    })
};

const verify = (req, res) => {
    if (req.session.currentUser) {
        return res.json({
            status: 200,
            message: 'Authorized',
            user: req.session.currentUser,
        });
    } else {
        return res.json({
            status: 400,
            message: 'Unauthorized. Please login and try again.'
        })
    }
};

module.exports = {
    register,
    login,
    logout,
    verify,
};