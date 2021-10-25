const User =require('../models/User');
const Category=require('../models/Category');
const Course=require('../models/Course');

exports.getAdminPage= async(req,res)=>{
    const user = await User.findOne({_id:req.session.userId})

    const users= await User.find().sort({created_date:-1});
    const categories= await Category.find();
    const courses= await Course.find();

res.status(200).render('admin',{page_name: 'admin',user,users,categories,courses});
}


exports.userDelete=async(req,res)=>{
    const _id=req.params.id;
    await User.findByIdAndRemove(_id);
    await Course.deleteMany({user:_id});
    res.status(200).redirect('/adminPage');
}


exports.categoriesDelete=async(req,res)=>{
    const _id=req.params.id;
    await Category.findOneAndRemove(_id);
    res.status(200).redirect('/adminPage');
}



exports.categoriesUpdate=async(req,res)=>{
    const _id=req.params.id;
    const {title}=req.body;
   const category= await Category.findById(_id);
    category.title=title;
    category.save();
   
    res.status(200).redirect('/adminPage');
}


exports.createCategory=async(req,res)=>{
   

    await Category.create(req.body);
   
   
    res.status(200).redirect('/adminPage');
}

