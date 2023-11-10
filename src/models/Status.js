// models/Status.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');


const Status = sequelize.define('Status', {
    id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'status',
    timestamps: false
});

module.exports = Status;
