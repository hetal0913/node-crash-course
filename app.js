const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes');

//express app
const app = express();

//connect to database
const mongoURI = "mongodb://localhost:27017/node-tuts";
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => { 
    console.log("Database connected successfully.");
    //listen to request only when db is connected
    app.listen(3000);
})
.catch((err) => { console.log("connection error: " + err)})

//register views
app.set('view engine', 'ejs');

// middleware example
// app.use((req,res,next)=>{
//     console.log("New request data:");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// });

// middleware
// app.use((req, res, next)=> {
//     console.log("in the next middleware");
//     next();
// });

//middleware and static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//import blogs routes
app.use('/blogs', blogRouter);

//other routes
app.get('/', (req,res)=> {
    res.redirect('/blogs')
});

app.get('/about', (req,res)=> {
    //send html file as response
    //res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'});
});

//redirects
app.get('/about-us', (req,res)=> {
    res.redirect('/about')
});

//404 page
app.use((req,res)=>{
    //send html file as response
    //res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'});
})