// models/PublicationType.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');
const ProductType = require('./ProductType');

const ModelType = sequelize.define('ModelType', {
    id_model: {
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
    tableName: 'model_type',
    timestamps: false
});

ModelType.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});
ModelType.belongsTo(Status, {foreignKey: 'status_id'});
ModelType.belongsTo(ProductType, {foreignKey: 'id_product_type'}); 
module.exports = ModelType;
