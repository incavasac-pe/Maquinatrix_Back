const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailSender {
  constructor() {
  /*  this.transporter = nodemailer.createTransport({
      service:'gmail',
      auth : {
        type:'OAuth2',
        user :process.env.EMAIL_ADDRESS,
        pass :process.env.EMAIL_PASSWORD,
        clientId :process.env.EMAIL_CLIENTID,
        clientSecret : process.env.EMAIL_CLIENTSECRET,
        refreshToken : process.env.EMAIL_REFRESHTOKEN
      }    
    });*/
    this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true si usas SSL/TLS,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  }

    sendEmail(to, subject, data, type) {
        let html;
        if (type == 1) {
            html = `<!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
        </head>
        <body>        
        </body>
        </html>`
        } else if(type == 2) {
            html = `<!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
            </head>
            <body>
            <h1>Recuperar contraseña</h1>
            <p>Se ha generado el código : <b> ${data}</b> </p>       
            </body>
            </html>`
        } else if(type == 3) {
            const activationLink = 'http://localhost/Maquinatrix_frontend/login.php?token='+data;
            const paragraph = `<p>Se ha realizado el registro de tu cuenta maquinatrix, activa tu cuenta haciendo clic <a href="${activationLink}"><b>aquí</b></a>.</p>`;
            html = `<!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
        </head>
        <body>
        <h1>Registro de cuenta Maquinatrix</h1>
        ${paragraph}  
        </body>
        </html>`
        }

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: to,
            subject: subject,
            text: '',
            html: html
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
