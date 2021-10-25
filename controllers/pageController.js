const User = require('../models/User')
const Course = require('../models/Course')



exports.getIndexPage = async(req, res) => {
const courses =await Course.find().sort({created_date:-1}).limit(2);
const totalCourses=await Course.find().countDocuments();

const totalTeachers=await User.countDocuments({role:'Teacher'});
const totalStudents=await User.countDocuments({role:'Student'});

  res.status(200).render('index', { page_name: 'index',courses,totalCourses,totalTeachers,totalStudents });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' });
};


exports.getRegisterPage= (req, res) => {
  res.status(200).render('register', { page_name: 'register' });
};

exports.getLoginPage= (req, res) => {
  res.status(200).render('login', { page_name: 'login' });
};


