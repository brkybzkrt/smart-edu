const mongoose = require('mongoose');
const slugify= require('slugify');

const Schema= mongoose.Schema;

const CategorySchema= new Schema({

    title:{type:String,required:true,unique:true},
    created_date:{type:Date,default: Date.now},
    slug:{type:String,unique:true}
})

CategorySchema.pre('validate',function(next){
    this.slug=slugify(this.title,{
        lower:true,
        strict:true
    })
    next();
})

const Category =mongoose.model('Category',CategorySchema);

module.exports=Category;