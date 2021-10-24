const express=require('express');
const { userDelete,categoriesDelete,categoriesUpdate } = require('../controllers/adminController');


const router = express.Router();

router.route('/userDelete/:id').delete(userDelete);
router.route('/categoriesUpdate/:id').put(categoriesUpdate);
router.route('/categoriesDelete/:id').delete(categoriesDelete);
module.exports=router;
