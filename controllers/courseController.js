const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  
  try {
    const courses = await Course.find().sort({ created_date: -1 });
    res.status(200).render('courses',{
      courses,
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
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};
