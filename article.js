const mongoose=require('mongoose')
const marked=require('marked')
const slugify=require('slugify')

const articleschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    content:{
        type:String, 
    },
    createdat:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }
});

articleschema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title, {lower:true , strict:true})
    }

    next()

});

module.exports=mongoose.model('Article',articleschema);