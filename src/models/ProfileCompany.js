// models/ProfileCom.js

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
        allowNull: false
    }, 
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
   
    id_type_doc:  {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    num_doc:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    address:{
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
Profile.belongsTo(TypeDoc, {foreignKey: 'id_type_doc'})
Profile.belongsTo(Users, {foreignKey: 'id_user'});

module.exports = Profile;
