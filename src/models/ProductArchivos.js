// models/ProductImages.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Products = require('./Products');

const ProductArchivos = sequelize.define('ProductArchivos', {
    id_archivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    archivo_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },   
    path: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'product_archivo',
    timestamps: false
});

ProductArchivos.belongsTo(Products, {foreignKey: 'id_product'});

module.exports = ProductArchivos;
