const {literal} = require('sequelize');
const crypto = require('crypto');
const Users = require('../models/User');
const Status = require('../models/Status');
const UserRoles = require('../models/UserRoles');
const Roles = require('../models/Roles');
const Profile = require('../models/Profile');

UserRoles.belongsTo(Users, {foreignKey: 'id_user'});
Users.hasMany(UserRoles, {foreignKey: 'id_user'});
Profile.belongsTo(Users, {foreignKey: 'id_user'});
Users.hasOne(Profile, {foreignKey: 'id_user'});
class UserControllers {

    async validateCredencials(email, password) {
        let response
        try {
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            console.log("passs",hashedPassword)
            const results = await Users.findAll({
                attributes: [
                    'id_user',
                    'email',
                    'Profile.full_name',
                    'Profile.photo',
                    'UserRoles.id_role'
                ],
                include: [
                    {
                        model: Status,
                        required: true,
                        where: {
                            id_status: '3'
                        }
                    }, {
                        model: UserRoles,
                        required: true,
                        include: [
                            {
                                model: Roles,
                                required: true
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

}

module.exports = UserControllers;
