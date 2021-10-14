const courseController=require('../controllers/courseController');
const express=require('express');



const router= express.Router();

router.route('/add').post(courseController.createCourse)// http://localhost:3000/courses