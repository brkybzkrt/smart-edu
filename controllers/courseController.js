const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  const courses = await Course.find().sort({ created_date: -1 });

  try {
    res.status(200).json({
      status: 'success',
      courses,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
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
