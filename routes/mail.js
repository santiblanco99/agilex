const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agilexgroupcol@gmail.com',
    pass: 'Agilex2020'
  },
  tls: {
    rejectUnauthorized: false
},
secure: false, // use SSL
});



router.get('/:correo/:title/:id/:pi/:si', async (req, res) => {
///:title/:id/random', async (req, res) => {
  console.log("SEND MAIL");
  var id = req.params.id;
  var correo = req.params.correo;
  var title = req.params.title;
  var random = req.params.pi;
  var yo = req.params.si;
  var mailOptions = {
    from: 'agilexgroupcol@gmail.com',
    to: correo,
    subject: 'Invitación a editar: '+title,

    
   text: yo+' te invita a  editar el documento '+title+' enlace: '
    + 'http://localhost:4200/guest/'+id+
    '/'+random +
    '\nAtentamente, Agilex '
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);

    } else {
      console.log('Email sent: ' + info.response);
    }
    
  });
  res.send(null);
  
});

module.exports = router;