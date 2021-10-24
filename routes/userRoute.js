const authController = require('../controllers/authController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User =require('../models/User');

const router = express.Router();

router.route('/register').post([
    body('name').not().isEmpty().withMessage('Name field is not empty'),
    body('email').isEmail().withMessage('Please enter correct email').custom((email)=>{
        return User.findOne({email}).then(user=>{
            if(user){
                return Promise.reject('Email is already exist');
            }
        })
    }),
    body('password').not().isEmpty().withMessage('Please enter a password')
],authController.createUser); // http://localhost:3000/users/register

router.route('/login').post(authController.loginUser);

router.route('/logout').get(authController.logoutUser);

router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);


module.exports = router;
