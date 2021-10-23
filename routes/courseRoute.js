const courseController=require('../controllers/courseController');
const express=require('express');
const roleMiddleware=require('../middlewares/roleMiddleware');



const router= express.Router();

router.route('/').get(courseController.getCourses)// http://localhost:3000/courses
router.route('/add').post(roleMiddleware(["Admin","Teacher"]),courseController.createCourse)
router.route('/:slug').get(courseController.getCourse)
router.route('/registerToCourse').post(courseController.registerToCourse)
router.route('/releaseToCourse').post(courseController.releaseToCourse)
router.route('/:slug').delete(courseController.deleteCourse)

module.exports=router;