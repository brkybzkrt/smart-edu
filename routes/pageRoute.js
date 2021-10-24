const pageController=require('../controllers/pageController');
const express=require('express');
const redirectMiddleware=require('../middlewares/redirectMiddleware');
const { getAdminPage } = require('../controllers/adminController');
const roleMiddleware= require('../middlewares/roleMiddleware')

const router = express.Router();


router.route('/').get(pageController.getIndexPage);

router.route('/about').get(pageController.getAboutPage);

router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);

router.route('/login').get(redirectMiddleware,pageController.getLoginPage)

router.route('/adminPage').get(getAdminPage)




module.exports=router;
