const Course = require('../models/Course');
const Category = require('../models/Category');
const User=require('../models/User');

exports.getCourses = async (req, res) => {
  
  try {
    const categorySlug= req.query.categories;

    const category = await Category.findOne({slug:categorySlug})
    let filter={};

    if(categorySlug){
      filter={category:category._id}
    }
   
   
    const courses = await Course.find(filter).sort({ created_date: -1 }).populate('user');
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
    res.status(200).render('course-single',{
      course,
      page_name:`courses/${slug}`,
      user
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


