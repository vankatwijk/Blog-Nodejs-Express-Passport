const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const userRouter = require('./routes/users')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/nodeblog',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false})) //tells express we want to get data from form like req.body.email
app.use(methodOverride('_method'))

app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index', {articles: articles})
})
app.use('/articles', articleRouter)
app.use('/auth', userRouter)

app.listen(5000)