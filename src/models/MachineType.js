 
const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');
const ProductType = require('./ProductType');

const MachineType = sequelize.define('MachineType', {
    id_machine: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_product_type: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },   
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'machine_type',
    timestamps: false
});

module.exports = MachineType;
