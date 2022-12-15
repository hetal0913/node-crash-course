const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true
    }
}, {timestamps: true})

//declare blog model to communicate
//model param name blog will look into db table with name blogs
const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;