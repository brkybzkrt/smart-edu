const bcrypt=require('bcrypt');
const {validationResult } = require('express-validator');
const User =require('../models/User');
const Category=require('../models/Category');
const Course=require('../models/Course');

exports.createUser=async (req,res)=>{

    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
      } catch (error) {
        const errors= validationResult(req);

        for(let i=0;i<errors.array().length;i++){

          req.flash('error',` ${errors.array()[i].msg}`)
        }
        res.status(400).redirect('/register');
      }
}



exports.loginUser= (req,res)=>{

  try {
    const{email,password}=req.body;

     User.findOne({email},(err,user)=>{
      if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
          if(same){
            req.session.userId=user._id;
            req.session.userRole=user.role;
            if(user.role==='Admin'){
                
                res.status(200).redirect('/adminPage');
            }else{
              res.status(200).redirect('/users/dashboard');
            }
            
          }else{
            req.flash('error',`Password is not correct`)
            res.status(400).redirect('/login')
          }
        })
      }else{
        req.flash('error',`Wrong user or user not exist`)
        res.status(400).redirect('/login')
      }
    })
    
    } catch (error) {
      res.status(404).json({
        status: 'error',
        error,
      });
    }
}

exports.logoutUser=(req,res)=>{

  req.session.destroy(()=>{
    res.redirect('/')
  })
}


exports.getDashboardPage = async(req, res) => {

  const user = await User.findOne({_id:req.session.userId}).populate('courses')
  const categories = await Category.find().sort({ created_date: -1 })
  const courses=await Course.find({user:req.session.userId}).sort({ created_date: -1 })

  res.status(200).render('dashboard', { page_name: 'dashboard', user, categories, courses});
};

