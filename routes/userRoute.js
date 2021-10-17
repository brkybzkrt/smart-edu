const authController=require('../controllers/authController');
const express=require('express');



const router= express.Router();

router.route('/register'). post(authController.createUser)// http://localhost:3000/users/register



module.exports=router;