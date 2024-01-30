const express = require("express");
const jwt = require('jsonwebtoken');
const authenticateToken = require('./../middleware/auth');
const router = express.Router();
const UserControllers = require('../controllers/users');
const { newResponseJson } = require('./../responseUtils');
const EmailSender = new require('../services/send_email');
const emailSender = new EmailSender();
var generator = require('generate-password');
require('dotenv').config();


router.post('/register_account', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;
    const userData = req.body;

    // Verificar si los campos requeridos no están vacíos o nulos
    const requiredFields = ['type_user', 'status_id', 'email', 'password', 'firstname', 'lastname', 'type_doc', 'num_doc', 'address'];
    const missingFields = requiredFields.filter(field => !userData[field]);

    if (missingFields.length > 0) {
        flag = true;
        response.msg = `Los siguientes campos son requeridos: ${missingFields.join(', ')}`;
        return res.status(status).send(response)
    }
    result = await new UserControllers().createUser(userData);
    if (result && !result.error) {
        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        emailSender.sendEmail(userData.email, 'Registro de cuenta', token, 3).then(response_email => {
            console.log('Correo enviado:', response_email);
            response.error = false;
            response.msg = `Registro exitoso, se ha enviado al correo el link de validación.`;
            status = 201;
            response.data = {
                id_product: result
            };
            res.status(status).json(response);
        }).catch(error => {
            response.msg = `Error al enviar el correo`;
            console.log('Error al enviar el correo:', error);
            res.status(status).json(response)
        });

    } else {
        response.msg = result.msg;
        res.status(status).json(response)

    }


})
router.post('/login_account', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;
    const { email, password } = req.body;

    if (email.trim() == '' || password.trim() == '') {
        flag = true;
        response.msg = 'Campos vacíos';
        res.status(status).json(response);
        return; // Terminar la ejecución aquí
    }

    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
        response.msg = `Correo electrónico inválido`;
        res.status(status).json(response);
        return; // Terminar la ejecución aquí
    }

    userData = await new UserControllers().validateCredencials(email, password);  
    if (userData.length == 0) {
        response.msg = `Credenciales inválidas`;
        res.status(status).json(response);
        return; // Terminar la ejecución aquí
    } 
   const id_user = userData[0].id_user
   const status_id = userData[0].status_id 
    if ( status_id != 3) {
        response.msg = `La cuenta no está activa.`;
        res.status(status).json(response);
        return; // Terminar la ejecución aquí
    }
     
    let full_name, photo, roles, id_roles;
    if (userData[0].Profile) {
        full_name = userData[0].Profile.full_name;
        photo = userData[0].Profile.photo;
    } else {
        full_name = null;
        photo = null;
    }
    if (userData[0].UserRoles[0].Role) { 
         roles = userData[0].UserRoles[0].Role.roles;
         id_roles = userData[0].UserRoles[0].Role.id_roles
    } else {
        roles = null;
        id_roles = null;
    }
    const token = jwt.sign({   
        id_user ,
        email,
        full_name,
        status_id 
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    response.error = false;
    response.msg = `Inicio de sesión exitoso`;
    response.data = {
        id_user,
        status_id, 
        email,
        full_name,
        photo,
        roles,
        id_roles,
        token
    };
    status = 200;

    res.status(status).json(response);
});

router.post('/generateDigPassword', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    response.error = true;

    const { email } = req.body
    const result = await new UserControllers().getUserByEmail(email);

    if (result == null) {
        response.msg = `Usuario no existe`;
        res.status(status).json(response)
    } else {
        const code = generateFourDigitCode();
        const result_act = await new UserControllers().generateUserCode(email, code);
        if (result_act == 1) {
            emailSender.sendEmail(email, 'Resetear contraseña', code, 2).then(response_email => {
                console.log('Correo enviado:', response_email);
                response.error = false;
                response.msg = `Se envio el código al correo.`;
                status = 200;
                res.status(status).json(response)
            }).catch(error => {
                response.msg = `Error al enviar el correo`;
                console.log('Error al enviar el correo:', error);
                res.status(status).json(response)
            });
        } else {
            response.msg = `Error en el codigo.`;
            res.status(status).json(response)
        }

    }
});

router.post('/validateDigPassword', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    response.error = true;

    const { email, code } = req.body
    const result = await new UserControllers().getUserByEmail(email);

    if (result == null) {
        response.msg = `Usuario no existe`;
        res.status(status).json(response)
    }

    const result_code = await new UserControllers().getUserByCode(email, code)
    if (result_code !== null) {
        response.error = false;
        response.msg = `Código validado.`;
        status = 200
        res.status(status).json(response)
    } else {
        response.msg = `Código inválido.`;
        res.status(status).json(response)
    }


});


router.post('/resetPassword', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    response.error = true;

    const { email, password, new_password } = req.body;

    if (password !== new_password) {
        response.msg = 'Las contraseñas no coinciden';
        res.status(status).json(response);
    } else {
        const result = await new UserControllers().getUserByEmail(email);

        if (result == null) {
            response.msg = 'Usuario no existe';
            res.status(status).json(response);
        } else {
            const result_act = await new UserControllers().updateUser(password, email);
            if (result_act == 1) {
                response.error = false;
                response.msg = 'Se restableció la contraseña';
                status = 200;
                res.status(status).json(response);
            } else {
                response.msg = 'Ocurrió un error actualizando';
                res.status(status).json(response);
            }
        }
    }
});

router.get('/activate_account', async (req, res) => {
    try {
        const response = newResponseJson();
        let status = 400;
        response.error = true;
        const token = req.query.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email;

        const result = await new UserControllers().getUserByEmail(email);
        if (result == null) {
            response.msg = `Usuario no existe`;
            res.status(status).json(response)
        } else {

            const result_act = await new UserControllers().activateUser(email, '3');
            if (result_act == 1) {
                response.error = false;
                response.msg = `El usuario ha sido activado exitosamente.`;
                status = 200
            } else {
                response.msg = `Error en la activación.`;
            }
        }
        res.status(status).json(response)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {

            res.status(500).json({ msg: 'Token expired', error: true })
        }
        res.status(500).json({ msg: 'Token inválido', error: true })
    }
});

function generateFourDigitCode() {
    const min = 1000; // El valor mínimo de un número de 4 dígitos
    const max = 9999; // El valor máximo de un número de 4 dígitos
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
}

module.exports = router;
