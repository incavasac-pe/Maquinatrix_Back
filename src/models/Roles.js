// models/Roles.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');

const Roles = sequelize.define('Roles', {
    id_roles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    roles: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

Roles.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});

module.exports = Roles;
