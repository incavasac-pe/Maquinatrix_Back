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

    sendEmail(to, subject, data, type,name) {
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
                        html = `
         <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">     
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width:700px; margin: 0 auto;">
                    <h2>Hola, ${name}</h2>
                    
                    <p>¿Olvidaste tu contraseña de Maquinatrix? No hay problema. Sólo tienes que escribir el código de más abajo en el formulario de recuperación de contraseña.</p>
                    
                    <p><strong>Código: ${data}</strong></p>
                    
                    <p>¿Recordaste tu contraseña y ya no necesitas restablecerla? Siéntete libre de ignorar este correo electrónico. Tu contraseña no será cambiada.</p>
                    
                    <p>Te saluda,</p>
                    
                    <p><strong>Equipo Maquinatrix</strong></p>
                </div>
            </body>
            </html>
            `
        } else if(type == 3) {
            const activationLink = 'https://maquinatrix.com/login.php?token='+data;
              html = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Registro exitoso</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
                    <h2>Hola, ${name}</h2>
                    
                    <p>¡Felicidades! Te has registrado exitosamente a Maquinatrix. Activa tu cuenta haciendo clic <a href="${activationLink}"><b>aquí</b></a>.</p> 

                    <p>Queremos desearte lo mejor en tus futuros negocios con la comunidad y que disfrutes de un marketplace hecho a la medida para tus necesidades.</p>
                    
                    <p>Averigua más sobre nosotros y nuestros servicios en nuestra página corporativa:</p>
                    
                    <p><a href="https://maquinatrix.company/">https://maquinatrix.company/</a></p>
                    
                    <p>Te saluda,</p>
                    
                    <p><strong>Equipo Maquinatrix</strong></p>
                </div>
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
