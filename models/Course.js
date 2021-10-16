const mongoose = require('mongoose');
const slugify= require('slugify');

const Schema= mongoose.Schema;

const CourseSchema= new Schema({

    title:{type:String,required:true,unique:true},
    description:{type:String},
    image:{type:String,default:"default-image.jpg"},
    created_date:{type:Date,default: Date.now},
    slug:{type:String,unique:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}
})

CourseSchema.pre('validate',function(next){
    this.slug=slugify(this.title,{
        lower:true,
        strict:true
    })
    next();
})

const Course =mongoose.model('Course',CourseSchema);

module.exports=Course;