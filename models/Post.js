const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: String,
    imageUrl: String,
    tags: [String],
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // comments: [Comment.schema]
})

module.exports = mongoose.model('Post', PostSchema);