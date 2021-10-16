const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  
    try {
      const categories = await Category.find().sort({ created_date: -1 });
      res.status(200).json({
        categories,
        page_name:'courses'
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        error,
      });
    }
  };



exports.createCategory = async (req, res) => {
  
    try {
      const category = await Category.create(req.body);
      res.status(201).json({
        status: 'success',
        category,
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        error,
      });
    }
  };
  