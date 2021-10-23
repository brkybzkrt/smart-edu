const nodemailer = require("nodemailer");

exports.getContactPage=(req,res)=>{
    res.status(200).render('contact',{page_name:'contact'});
  }
  
exports.sendEmail= async(req,res)=>{

  try{

  
    const htmlBody=`<h2>Message</h2>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <div>
        <h3>${req.body.subject}</h3> </br>
        <p>${req.body.message}</p>
        </div>
    
    `

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "b9bozkurt959@gmail.com", // gmail
          pass: "cjmgbkctufivbnnm", // your password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"SmartEdu.com" smartedu@gmail.com', // sender address
        to: "b9bozkurt959@gmail.com", // list of receivers
        subject: req.body.subject, // Subject line
        html: htmlBody, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      req.flash('success','Your message sent successfully')
    res.status(200).redirect('/contact');
  }catch(err){
    req.flash('error',`There is some errors`)
    res.status(200).redirect('/contact');
    }
}
