const Course = require('../models/Course');
const Category = require('../models/Category');

exports.getCourses = async (req, res) => {
  
  try {
    const categorySlug= req.query.categories;

    const category = await Category.findOne({slug:categorySlug})
    let filter={};

    if(categorySlug){
      filter={category:category._id}
    }
   
   
    const courses = await Course.find(filter).sort({ created_date: -1 });
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
    const course = await Course.findOne({slug:slug});
    res.status(200).render('course-single',{
      course,
      page_name:`courses/${slug}`
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
    const course = await Course.create(req.body);
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};
