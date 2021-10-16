const courseController=require('../controllers/courseController');
const express=require('express');



const router= express.Router();

router.route('/').get(courseController.getCourses)// http://localhost:3000/courses
router.route('/add').post(courseController.createCourse)
router.route('/:slug').get(courseController.getCourse)


module.exports=router;