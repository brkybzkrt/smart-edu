const express=require('express');
const { userDelete } = require('../controllers/adminController');


const router = express.Router();

router.route('/delete/:id').delete(userDelete);

module.exports=router;
