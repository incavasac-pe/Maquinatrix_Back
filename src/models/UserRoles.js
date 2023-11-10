// models/UserRoles.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Users = require('./User');
const Roles = require('./Roles');

const UserRoles = sequelize.define('UserRoles', {
    id_user_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

UserRoles.belongsTo(Users, {foreignKey: 'id_user'});
UserRoles.belongsTo(Roles, {foreignKey: 'id_role'});

module.exports = UserRoles;
