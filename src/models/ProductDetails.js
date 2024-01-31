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
    region: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    brand: { //marca
        type: DataTypes.STRING(255),
        allowNull: false
    },
    model: { //modelo
        type: DataTypes.STRING(255),
        allowNull: false
    },
    year: { //año
        type: DataTypes.STRING(10),
        allowNull: false
    },
    factory_code: { //codigo de fabrica
        type: DataTypes.STRING(50),
        allowNull: false
    },
    mileage: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    engine_number: { //numero de motor
        type: DataTypes.STRING(50),
        allowNull: false
    },
    chasis_number: {//numero chasis
        type: DataTypes.STRING(50),
        allowNull: false
    },
    patent:{ //patente
        type: DataTypes.STRING(50),
        allowNull: false
    },
    warranty: {  //grantia
        type: DataTypes.STRING(50),
        allowNull: false
    },
    condition: { //condicion nuevo o usado
        type: DataTypes.STRING(50),
        allowNull: false
    },
    owner: { //dueño
        type: DataTypes.STRING(50),
        allowNull: false
    },
    delivery: { //despacho
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
