const authController=require('../controllers/authController');
const express=require('express');



const router= express.Router();

router.route('/register').post(authController.createUser)// http://localhost:3000/users/register

router.route('/login').post(authController.loginUser)

router.route('/logout').get(authController.logoutUser)

module.exports=router;