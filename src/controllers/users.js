const crypto = require('crypto');
const Users = require('../models/User'); 
const UserRoles = require('../models/UserRoles');
const Roles = require('../models/Roles');
const Profile = require('../models/Profile');
const TypeUser = require('../models/TypeUser');
const Products = require('../models/Products');
const TypeDoc = require('../models/TypeDoc');


UserRoles.belongsTo(Users, { foreignKey: 'id_user' });
Users.hasMany(UserRoles, { foreignKey: 'id_user' });
Profile.belongsTo(Users, { foreignKey: 'id_user' });
Users.hasOne(Profile, { foreignKey: 'id_user' });

Users.hasOne(Profile, {
    foreignKey: 'id_user',
    as: 'profile'
});

Users.belongsTo(TypeUser, {
    foreignKey: 'id_type_user',
    as: 'type_user'
});
 

class UserControllers {


  // Función para validar si un ID ya existe en la base de datos
  async  isIDUnique(id) {
    const profile = await Profile.findOne({
      where: {
        id_user_ext: id,
      },
    });
  
    return !profile;
  }
  
  
  // Función para generar un ID único que no existe en la base de datos
  async  generateUniqueIDWithValidation() {
    let id;
  
    do {
      id = this.generateUniqueID();
    } while (!await this.isIDUnique(id));
  
    return id;
  }
  // Función para generar un ID único de 9 dígitos
    generateUniqueID() {
    const digits = '0123456789';
    let id = '';
  
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      id += digits[randomIndex];
    } 
    return id;
  }
    // Función para crear un nuevo usuario
    async createUser(userData,uniqueID) {
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
                status_id: userData.status_id,
                id_type_user: userData.id_type_user,
            }); 
            await UserRoles.create({
                id_user:newUser.id_user,
                id_role:3, 
            }); 

            if(newUser.id_user){
            // Crear el nuevo perfil
            await Profile.create({
                id_user: newUser.id_user,
                id_user_ext:uniqueID,
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
                ],
                include: [ 
                    {
                        model: UserRoles,
                        required: true,
                        attributes: [
                            'id_role'
                          ],
                        include: [
                            {
                                model: Roles,
                                required: false
                            }
                        ]
                    }, {
                        model: Profile,
                        required: false,
                        attributes: [
                            'full_name',
                            'last_name',
                            'id_user_ext'
                          ]
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

    
    async getUserByID(id_user) {
        let response
        try {
            const user = await Users.findOne({
                where: {
                    id_user: id_user
                }
            });
            response = user
        } catch (err) {
            response = err;
        }
        return response
    }
    async updateUserPassword(password, email) {
        let response
        try {
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

            const result = await Users.update({
                password: hashedPassword
            }, { 
                where: {
                   email:email
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

    
    async getProfileUser(email) {
        let response
        try {
            const user = await Users.findOne({
                where: {
                    email: email,                   
                }, 
                attributes: {
                    exclude: ['password','codepassword'], 
                },
                include: [
                    {
                        model: Profile,
                        as: 'profile',
                        attributes: {
                            exclude: ['id_user'],                            
                        }
                    },   
                    {
                        model: TypeUser,
                        as: 'type_user',
                        attributes: {
                            exclude: ['description','status_id'],                            
                        }
                    },  
                ],
            });
            const { id_user, status_id, profile, type_user } = user;

            const count = await Products.count({ //num de publicaciones del usuario
                where: {
                  id_user: id_user,
                },
              });

            const simplifiedResponse = {         
                id_user,
                status_id,
                email, 
                ...profile.dataValues, 
                ...type_user.dataValues,  
                 num_publications : count
            };
   
            response = simplifiedResponse
        } catch (err) {
            response = err;
        }
        return response
    }

    async  updateUserProfile(id_profile, updateFields) {
        let response;
        try {
          const profile = await Profile.findByPk(id_profile);
          
          if (!profile) {
            return { error: true, msg: 'Perfil no existe' };
          }
          
          const { error: validationError } = profile.validate(updateFields);
          if (validationError) {
            return { error: true, msg: 'Datos de perfil no válidos' };
          }
          
          for (const [key, value] of Object.entries(updateFields)) {
            if (profile.dataValues.hasOwnProperty(key)) {
              try {
                profile[key] = value;
                await profile.save();
                response = profile;
              } catch (error) {
                // Manejo de errores específicos del campo
                if (error.name === 'SequelizeDatabaseError') { 
                  return { error: true, msg: `${key}:`+ error.parent };
                } else {
                  // Manejo de otros errores 
                  return { error: true, msg: `Error al actualizar el campo ${key}` };
                }
              }
            }
          } 
        } catch (err) {
          response = err;
        }
        
        return response;
      }

      
    async  updateUserEmail(id_user, updateFields) {
        let response;
        try {
          const user = await Users.findByPk(id_user);
          
          if (!user) {
            return { error: true, msg: 'Usuario no existe' };
          }
          
          const { error: validationError } = user.validate(updateFields);
          if (validationError) {
            return { error: true, msg: 'Datos de perfil no válidos' };
          }
          
          for (const [key, value] of Object.entries(updateFields)) {
            if (user.dataValues.hasOwnProperty(key)) {
              try {
                user[key] = value;
                await user.save();
                response = user;
              } catch (error) {
                // Manejo de errores específicos del campo
                if (error.name === 'SequelizeDatabaseError') { 
                  return { error: true, msg: `${key}:`+ error.parent };
                } else {
                  // Manejo de otros errores 
                  return { error: true, msg: `Error al actualizar el campo ${key}` };
                }
              }
            }
          } 
        } catch (err) {
          response = err;
        }
        
        return response;
      }
    }
module.exports = UserControllers;
