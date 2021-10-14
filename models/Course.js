const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const CourseSchema= new Schema({

    title:{type:String,required:true,unique:true},
    description:{type:String},
    image:{type:String,default:"public/default-image.jpg"},
    created_date:{type:Date,default: Date.now}
})

const Course =mongoose.model('Course',CourseSchema);

module.exports=Course;