const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const moment = require('moment'); 

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const contactRoute = require('./routes/contactRoute');
const adminRoute = require('./routes/adminRoute');
const app = express();

mongoose
  .connect('mongodb+srv://admin:pLeClvudsIhverUe@cluster0.ohhnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    usenewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Bağlantı başarılı');
  });

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIn = null;
global.userRole="";

global.time=(e)=>{
return moment(e).fromNow();
}

//Middlewares
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:pLeClvudsIhverUe@cluster0.ohhnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' }),
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);



//Routes
app.use('*', (req, res, next) => {
  userIn = req.session.userId;
  next();
});

app.use('*', (req, res, next) => {
  userRole = req.session.userRole;
  next();
});



app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/contact', contactRoute);
app.use('/admin', adminRoute);

const port = process.env.PORT|| 5000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
