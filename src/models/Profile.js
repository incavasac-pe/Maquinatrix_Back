// models/Profile.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Users = require('./User');

const Profile = sequelize.define('Profile', {
    id_profile: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'profile',
    timestamps: false
});

Profile.belongsTo(Users, {foreignKey: 'id_user'});

module.exports = Profile;
