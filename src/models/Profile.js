// models/Profile.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Users = require('./User');
const TypeDoc = require('./TypeDoc');

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
        type: DataTypes.STRING(100),
        allowNull: true
    }, 
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },   
    id_type_doc:  {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    num_doc:{
        type: DataTypes.STRING(15),
        allowNull: true
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    razon_social:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    rutCompany:{
        type: DataTypes.STRING(20),
        allowNull: true
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    FullNameRepreLegal:{
        type: DataTypes.STRING(150),
        allowNull: true
    },
    LastNameRepreLegal:{
        type: DataTypes.STRING(150),
        allowNull: true
    },
    RutRepreLegal:{
        type: DataTypes.STRING(150),
        allowNull: true
    },
    emailRepreLegal:{
        type: DataTypes.STRING(255),
        allowNull: true, 
    },
    id_user_ext: {
        type: DataTypes.STRING(9),
        allowNull: true,
      },
}, {
    tableName: 'profile',
    timestamps: false
});
Profile.belongsTo(TypeDoc, {foreignKey: 'id_type_doc'})
Profile.belongsTo(Users, {foreignKey: 'id_user'}); 
module.exports = Profile;
