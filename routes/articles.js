const express = require('express')
const Articles = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.get('/:id', (req, res) => {
    res.render('articles/new',{article: new Articles() })
})

router.post('/', async (req, res) => {
    const article = new Articles({
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        res.render('articles/new',{article:article})
    }
})

module.exports = router