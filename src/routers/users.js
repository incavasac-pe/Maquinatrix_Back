const express = require("express");
const jwt = require('jsonwebtoken');
const authenticateToken = require('./../middleware/auth');
const router = express.Router();
const UserControllers = require('../controllers/users');
const { newResponseJson } = require('./../responseUtils');
const EmailSender = new require('../services/send_email');
const emailSender = new EmailSender(); 

require('dotenv').config();


router.post('/register_account', async (req, res) => {
    const response = newResponseJson();
    let status = 400; 
    const userData = req.body;
    const uniqueID = await new UserControllers().generateUniqueIDWithValidation();   
     console.log('ID único generado:', uniqueID);
   

    // Verificar si los campos requeridos no están vacíos o nulos
    //const requiredFields = ['id_type_user', 'status_id', 'email', 'password', 'firstname', 'lastname', 'type_doc', 'num_doc', 'address'];
    const requiredFieldsByUserType = {
        1: ['id_type_user', 'status_id', 'email', 'password', 'firstname', 'lastname', 'type_doc', 'num_doc', 'address'],
        2: ['id_type_user', 'status_id', 'email', 'emailRepreLegal', 'password', 'rutCompany', 'FullNameRepreLegal', 'LastNameRepreLegal', 'RutRepreLegal'],  };
        
    const requiredFields = requiredFieldsByUserType[userData.id_type_user];
    console.log("*******",requiredFields);
    const missingFields = requiredFields.filter(field => !userData[field]);

    if (missingFields.length > 0) { 
        response.msg = `Los siguientes campos son requeridos: ${missingFields.join(', ')}`;
        return res.status(status).send(response)
    }
    result = await new UserControllers().createUser(userData,uniqueID);
    if (result && !result.error) {

        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        if(userData.credencials===1){
            emailSender.sendEmail(userData.email, 'Registro de cuenta', token, 3).then(response_email => {
                    console.log('Correo enviado:', response_email);
                    response.error = false;
                    response.msg = `Registro exitoso, se ha enviado al correo el link de validación.`;
                    status = 201;
                    delete result.password;
                    response.data =  result
                    
                    res.status(status).json(response);
                }).catch(error => {
                    response.msg = `Error al enviar el correo`;
                    console.log('Error al enviar el correo:', error);
                    res.status(status).json(response)
                });
            }else{
                response.error = false;
                response.msg = `Registro exitoso redes.`;
                status = 201;
                delete result.password;
                response.data =  result
                
                res.status(status).json(response);
            }

    } else {
        response.msg = result.msg;
        res.status(status).json(response)

    }
})

router.post('/login_account', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    let flag = false;
    const userDataBody = req.body;
       // Verificar si los campos requeridos no están vacíos o nulos
       const requiredFields = ['email', 'password',];
       const missingFields = requiredFields.filter(field => !userDataBody[field]);
   
       if (missingFields.length > 0) { 
           response.msg = `Los siguientes campos son requeridos: ${missingFields.join(', ')}`;
           return res.status(status).send(response)
       }


    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;  
    if (!validEmail.test(userDataBody.email)) {
        response.msg = `Correo electrónico inválido`;
        res.status(status).json(response);
        return; // Terminar la ejecución aquí
    }
  
    userData = await new UserControllers().validateCredencials(userDataBody.email, userDataBody.password,userDataBody.credencials);  
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
     
    let full_name, razon_social,photo, roles, id_roles,id_user_ext;
    if (userData[0].Profile) {
        full_name = userData[0].Profile.full_name !=null ? userData[0].Profile.full_name   + ' '+ userData[0].Profile.last_name : userData[0].Profile.FullNameRepreLegal + ' '+ userData[0].Profile.LastNameRepreLegal ;
        razon_social = userData[0].Profile.FullNameRepreLegal + ' '+ userData[0].Profile.LastNameRepreLegal ;
        photo = userData[0].Profile.photo;
        id_user_ext = userData[0].Profile.id_user_ext;
    } else {
        razon_social = null;
        full_name = null;
        photo = null;
        id_user_ext = null;
    }
    if (userData[0].UserRoles[0].Role) { 
         roles = userData[0].UserRoles[0].Role.roles;
         id_roles = userData[0].UserRoles[0].Role.id_roles
    } else {
        roles = null;
        id_roles = null;
    }
    const email_User = userDataBody.email
    const token = jwt.sign({   
        id_user ,
        email_User,
        full_name,        
        status_id 
    }, process.env.JWT_SECRET, { expiresIn: '24h' });
    response.error = false;
    response.msg = `Inicio de sesión exitoso`;
    response.data = {
        id_user,
        status_id, 
        email_User,
        full_name,
        razon_social,
        photo,
        id_user_ext,
        roles,
        id_roles,
        token
    };

    res.status(status).json(response);
});

 
router.post('/generateDigPassword', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    response.error = true;

    const { email } = req.body
    const result = await new UserControllers().getUserByEmail(email);

    if (result == null) {
        response.msg = `Correo electrónico no existe`;
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
            const result_act = await new UserControllers().updateUserPassword(password, email);
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

router.patch('/changePassword', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    response.error = true;

    const { id_user } = req.query;
    const {  password } = req.body; 
   
        const result = await new UserControllers().getUserByID(id_user); 
        if (result == null) {
            response.msg = 'Usuario no existe';
            res.status(status).json(response);
        } else {
            const result_act = await new UserControllers().updateUserPassword(password, result.email);
            if (result_act == 1) {
                response.error = false;
                response.msg = 'Se actualizó la contraseña';
                status = 200;
                res.status(status).json(response);
            } else {
                response.msg = 'Ocurrió un error actualizando';
                res.status(status).json(response);
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

router.get('/profile_basic',authenticateToken, async (req, res) => {

        const response = newResponseJson();
        let status = 400;
        response.error = true; 
        const email = req.user.email_User ?? '';

        const result = await new UserControllers().getUserByEmail(email);
        if (result == null) {
            response.msg = `Usuario no existe`;
            res.status(status).json(response)
        } else {
             
            const result_profile = await new UserControllers().getProfileUser(email); 
            if (result_profile) {
                response.error = false;
                response.msg = `Datos basicos del usuario`;
                response.data = result_profile; 
                status = 200
            } else {
                response.msg = `Error en la BD.`;
            }
            
        res.status(status).json(response)  
        }
});

router.patch('/profile_basic_update',authenticateToken, async (req, res) => {

    const response = newResponseJson();
    let status = 400;
    response.error = true; 
    const { id_profile } = req.query;
    const updateFields = req.body; // Obtener los campos a actualizar de la solicitud

    try { 
       
        const result_act = await new UserControllers().updateUserProfile(id_profile,updateFields);  
        if (result_act?.error && result_act.error ) {
            response.msg =  result_act
            res.status(status).json(response);           
        } else {
            response.error = false;
            response.msg = 'Datos actualizados exitosamente.';
            status = 200;
            response.data = result_act
            res.status(status).json(response);
        }
  
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
   
});
 
router.patch('/profile_basic_update_1',authenticateToken, async (req, res) => {

    const response = newResponseJson();
    let status = 400;
    response.error = true; 
    const { id_user } = req.query;
    const updateFields = req.body; // Obtener los campos a actualizar de la solicitud

    try { 
       
        const result_act = await new UserControllers().updateUserEmail(id_user,updateFields);  
        if (result_act?.error && result_act.error ) {
            response.msg =  result_act
            res.status(status).json(response);           
        } else {
            response.error = false;
            response.msg = 'Datos actualizados exitosamente.';
            status = 200;
            response.data = result_act
            res.status(status).json(response);
        }
  
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
   
});

function generateFourDigitCode() {
    const min = 1000; // El valor mínimo de un número de 4 dígitos
    const max = 9999; // El valor máximo de un número de 4 dígitos
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
}
 
module.exports = router;
