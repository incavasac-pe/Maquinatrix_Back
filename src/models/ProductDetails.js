// models/ProductDetails.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Products = require('./Products');

const ProductDetails = sequelize.define('ProductDetails', {
    id_product_details: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    year: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    condition: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    mileage: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    engine_number: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    warranty: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    delivery: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    pay_now_delivery: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    facipay: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
     contact_me: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'product_details',
    timestamps: false
});

ProductDetails.belongsTo(Products, {foreignKey: 'id_product'});

module.exports = ProductDetails;
