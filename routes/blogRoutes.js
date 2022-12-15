const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

//mongoose and sample routes
// add new blog

router.get('/add-blog', (req, res)=> {
    const newBlog = new Blog({
        title: 'new blog2',
        snippet: 'about new blog',
        body: ' about more details for my new blog'
    });
    newBlog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => { console.log(err)});
});

// get all blogs
router.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// get single block by id
router.get('/single-blog', (req, res) => {
    Blog.findById('6223123166acbaafaf1b9a82')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});


//original routes
router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.post('/', blogController.blog_create_post);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

module.exports = router;