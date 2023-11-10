// models/UserVerify.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');


const UserVerify = sequelize.define('UserVerify', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isverify: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'user_verify',
    timestamps: false
});

module.exports = UserVerify;
