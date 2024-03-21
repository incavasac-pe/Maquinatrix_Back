// models/PublicationType.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');
const ProductType = require('./ProductType');

const MarcaType = sequelize.define('MarcaType', {
    id_marca: {
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
    tableName: 'marca_type',
    timestamps: false
});

MarcaType.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});
MarcaType.belongsTo(Status, {foreignKey: 'status_id'});
MarcaType.belongsTo(ProductType, {foreignKey: 'id_product_type'}); 
module.exports = MarcaType;