const express=require('express');
const contactController  = require('../controllers/contactController');


const router= express.Router();

router.route('/').get(contactController.getContactPage);
router.route('/').post(contactController.sendEmail)

module.exports=router;