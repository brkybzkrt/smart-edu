const express=require('express');
const { userDelete,categoriesDelete,categoriesUpdate,createCategory } = require('../controllers/adminController');


const router = express.Router();

router.route('/userDelete/:id').delete(userDelete);
router.route('/categoriesUpdate/:id').put(categoriesUpdate);
router.route('/categoriesDelete/:id').delete(categoriesDelete);
router.route('/createCategory').post(createCategory);
module.exports=router;
