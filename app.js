const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore=require('connect-mongo');

const pageRoute = require('./routes/pageRoute');
const courseRoute=require('./routes/courseRoute');
const categoryRoute=require('./routes/categoryRoute');
const userRoute=require('./routes/userRoute');
const contactRoute=require('./routes/contactRoute');
const app = express();



mongoose
  .connect('mongodb://localhost/smartedu', {
    usenewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Bağlantı başarılı');
  });

//Template Engine
app.set('view engine', 'ejs');


//Global Variable
global.userIn=null;


//Middlewares
app.use(express.static('public'));

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  store:MongoStore.create({mongoUrl:'mongodb://localhost/smartedu'})
}))


//Routes
app.use('*',(req,res,next)=>{
  userIn=req.session.userId;
  next();
})

app.use('/', pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);
app.use('/contact',contactRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
