const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,  
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  sendEmail(to, subject,data,type) {        
    let html;
    if(type ==1){
        html = `<!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
        </head>
        <body>        
        </body>
        </html>` 
    } else {
        html = `<!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
        </head>
        <body>
        <h1>Resetear contraseña de Maquinatrix</h1>
        <p>Se ha realizado la actualización de la contraseña: <b> ${data}</b> </p>       
        </body>
        </html>` 
    }

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: to,
        subject: subject,
        text: '',
        html: html,
     };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    });
  }
}

module.exports = EmailSender;