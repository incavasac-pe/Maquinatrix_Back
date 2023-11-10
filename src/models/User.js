// models/User.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');

const Users = sequelize.define('Users', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

Users.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});

module.exports = Users;
