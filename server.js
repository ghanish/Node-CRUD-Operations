const express=require('express')
const mongoose=require('mongoose')
const methodoverride=require('method-override')
const articleRouter=require('./routes/articles.js')
const Article=require('./models/article.js')
const app=express()

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodoverride('_method'))


app.get('/',async (req,res)=>{
    const articles=await Article.find().sort({createdat:-1})
    // const articles=[{
    //     title:'First Title',
    //     createdat:new Date(),
    //     categories:'first category',
    //     content:'first content'
    // },
    // {
    // title:'Second Title',
    // createdat:new Date(),
    // categories:'second category',
    // content:'second content'
    // }]
    res.render('articles/index',{articles:articles})

});







app.use('/articles',articleRouter);
const port=process.env.port||5000
app.listen(port);