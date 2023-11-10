// models/ProductImages.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Products = require('./Products');

const ProductImages = sequelize.define('ProductImages', {
    id_image: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image_name: {
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
    tableName: 'product_images',
    timestamps: false
});

ProductImages.belongsTo(Products, {foreignKey: 'id_product'});

module.exports = ProductImages;
