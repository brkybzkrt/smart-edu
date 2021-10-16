const categoryController=require('../controllers/categoryController');
const express=require('express');



const router= express.Router();

router.route('/add').post(categoryController.createCategory)
router.route('/').get(categoryController.getCategories)


module.exports=router;