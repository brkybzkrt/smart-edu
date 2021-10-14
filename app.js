const express = require('express');
const ejs =require('ejs');

const app = express();



//Template engine
app.set('view engine','ejs');



//Middlewares
app.use(express.static('public'));



const port = 3000;


app.get('/',(req,res)=>{

  res.status(200).render('index',{page_name:"index"})
})


app.get('/about',(req,res)=>{

  res.status(200).render('about',{page_name:"about"})
})

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
