const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        require:true,
        unique:true
    }
})

articleSchema.pre('validate', function(){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }

    next()
})

module.exports = mongoose.model('Article',articleSchema)