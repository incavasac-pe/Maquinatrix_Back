const { literal } = require('sequelize');
const crypto = require('crypto');
const Users = require('../models/User');
const Status = require('../models/Status');
const UserRoles = require('../models/UserRoles');
const Roles = require('../models/Roles');
const Profile = require('../models/Profile');

UserRoles.belongsTo(Users, { foreignKey: 'id_user' });
Users.hasMany(UserRoles, { foreignKey: 'id_user' });
Profile.belongsTo(Users, { foreignKey: 'id_user' });
Users.hasOne(Profile, { foreignKey: 'id_user' });
class UserControllers {


    // Función para crear un nuevo usuario
    async createUser(userData) {
        try {
            // Verificar si el correo electrónico ya está registrado
            const existingUser = await Users.findOne({
                where: {
                    email: userData.email
                }
            });

            if (existingUser) {
                return { error: true, msg: 'El correo electrónico ya está registrado' }
            }
            const hashedPassword = crypto.createHash('md5').update(userData.password).digest('hex');
            // Crear el nuevo usuario
            const newUser = await Users.create({
                email: userData.email,
                password:hashedPassword,
                status_id: userData.status_id
            }); 
            await UserRoles.create({
                id_user:newUser.id_user,
                id_role:3, 
            }); 

            if(newUser.id_user){
            // Crear el nuevo perfil
            await Profile.create({
                id_user: newUser.id_user,
                full_name: userData.firstname,
                last_name: userData.lastname,
                id_type_doc: userData.type_doc,
                num_doc: userData.num_doc,
                address: userData.address,
                razon_social: userData.razon_social,
                rutCompany: userData.rutCompany ,
                photo: userData.photo,
                FullNameRepreLegal: userData.FullNameRepreLegal ,
                LastNameRepreLegal: userData.LastNameRepreLegal ,
                RutRepreLegal: userData.RutRepreLegal ,
                emailRepreLegal: userData.emailRepreLegal  
            });  
         } 
         return newUser 

        } catch (error) {
            throw error;
        }
    }

    async validateCredencials(email, password) {
        let response
        try {
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex'); 
            const results = await Users.findAll({
                attributes: [
                    'id_user',
                    'email',
                    'status_id',
                    'Profile.full_name',
                    'Profile.photo',
                    'UserRoles.id_role', 
                ],
                include: [
                   /* {
                        model: Status,
                        required: true,
                        where: {
                            id_status: '3'
                        }
                    }, */
                    {
                        model: UserRoles,
                        required: true,
                        include: [
                            {
                                model: Roles,
                                required: false
                            }
                        ]
                    }, {
                        model: Profile,
                        required: false
                    }
                ],
                where: {
                    email: email,
                    password: hashedPassword
                }
            });
            response = results

        } catch (err) {
            response = err;
        }
        return response
    }

    async getUserByEmail(email) {
        let response
        try {
            const user = await Users.findOne({
                where: {
                    email: email
                }
            });
            response = user
        } catch (err) {
            response = err;
        }
        return response
    }

    async updateUser(password, email) {
        let response
        try {
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

            const result = await Users.update({
                password: hashedPassword
            }, {
                where: {
                    email: email
                }
            });
            response = result

        } catch (err) {
            response = err;
        }
        return response
    }

    
    async activateUser(email,status) {
        let response
        try { 

            const result = await Users.update({
                status_id: status
            }, {
                where: {
                    email: email
                }
            });
            response = result

        } catch (err) { 
            response = err;
        }
        return response
    }

    async generateUserCode(email,codePassword) {   
        let response
        try { 
         const result = await Users.update({
                codepassword :codePassword
            }, {
                where: {
                    email: email
                }
            });  
            response = result

        } catch (err) {  
            response = err;
        }
        return response
    }

    async getUserByCode(email,codepassword) {
        let response
        try {
            const user = await Users.findOne({
                where: {
                    email,codepassword
                }
            });
            response = user
        } catch (err) {
            response = err;
        }
        return response
    }
}

module.exports = UserControllers;
