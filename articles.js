const express=require('express')
const Article=require('./../models/article.js')
const router=express.Router();


router.get('/new',(req,res)=>{
res.render('articles/new', {article:new Article()})
});

router.get('/edit/:id',async (req,res)=>{
    // res.send('in articles.js routes')
    const article=await Article.findById(req.params.id);
    // article.title=req.params.title;
    res.render('articles/edit', {article:article});
    });

router.get('/:slug',async (req,res)=> {
    const article=await Article.findOne({slug:req.params.slug});
    if(article==null) res.redirect('/')
    res.render('articles/show',{article:article})

})

router.post('/',async (req,res,next)=>{
   req.article=new Article()
    next()

},saveandredirect('new'));

router.put('/:id',async (req,res,next)=>{
    req.article=await Article.findById(req.params.id)
     next()
 
 },saveandredirect('edit'));

router.delete('/:id',async (req,res)=>{
   await Article.findByIdAndDelete(req.params.id);

   res.redirect('/')
})

function saveandredirect(path){
    return async(req,res)=>{
        let article=req.article
            article.title=req.body.title
            article.categories=req.body.categories
            article.content=req.body.content
        try{
            article=await article.save();
            res.redirect(`/articles/${article.slug}`)
        }
        catch(e){
            res.render(`articles/${path}`, {article:article})
        }

    }
}







module.exports=router;