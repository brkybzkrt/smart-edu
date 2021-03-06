const Course = require('../models/Course');
const Category = require('../models/Category');
const User=require('../models/User');

exports.getCourses = async (req, res) => {
  
  try {
    const categorySlug= req.query.categories;
    const search= req.query.search;

    const category = await Category.findOne({slug:categorySlug})
    let filter={};

    if(categorySlug){
      filter={category:category._id}
    }
   
    if(search){
      filter={title:search}
    }

    if(!search && !categorySlug){
      filter.title="";
      filter.category=null;
    }
   
    const courses = await Course.find({
      $or:[
        {title:{$regex:'.*'+ filter.title+'.*',$options:'i'}},
        {category:filter.category}
      ]
    }).sort({ created_date: -1 }).populate('user');
    const categories = await Category.find().sort({ created_date: -1 });
    
    res.status(200).render('courses',{
      courses,
      categories,
      page_name:'courses'
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  const slug = req.params.slug; 
  try {
    const course = await Course.findOne({slug:slug}).populate('user');
    const user= await User.findById(req.session.userId);
    const categories = await Category.find().sort({ created_date: -1 });
    res.status(200).render('course-single',{
      course,
      page_name:`courses/${slug}`,
      user,
      categories
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  
  try {
    const {title,description,category}=req.body;
    const course = await Course.create({
      title,
      description,
      user:req.session.userId,
      category
    });

    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};



exports.registerToCourse = async (req, res) => {
  
  try {
   const user = await User.findById(req.session.userId);
   await user.courses.push(req.body.courseId);
   await user.save();

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};



exports.releaseToCourse = async (req, res) => {
  
  try {
   const user = await User.findById(req.session.userId);
   await user.courses.pull(req.body.courseId);
   await user.save();

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteCourse= async(req,res)=>{
try {
  const slug=req.params.slug
  const course = await Course.findOneAndRemove({slug})
  req.flash('success',`${course.title} deleted succesfully`)
  res.status(200).redirect('/users/dashboard');
} catch (error) {
  res.status(400).redirect('/users/dashboard');
}

}


exports.updateCourse= async(req,res)=>{
  try {
    const slug=req.params.slug
    const {title, description,category}= req.body;
    const course = await Course.findOne({slug});
    course.title=title;
    course.description=description;
    course.category=category;
    course.save();

    req.flash('success',`${course.title} Updated succesfully`)
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).redirect('/users/dashboard');
  }
  
  }
  
