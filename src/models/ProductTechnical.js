// models/ProductDetails.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Products = require('./Products');

const ProductTechnical = sequelize.define('ProductTechnical', {
    id_product_technical: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },     
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: { //peso
        type: DataTypes.STRING(50),
        allowNull: true
    },
    power: { //potencia
        type: DataTypes.STRING(50),
        allowNull: true
    },
    displacement: { //cilindrada
        type: DataTypes.STRING(50),
        allowNull: true
    },
    torque: { //torque
        type: DataTypes.STRING(50),
        allowNull: true
    },
    mixed_consumption: { //consumo mixto
        type: DataTypes.STRING(50),
        allowNull: true
    },
    transmission: { //transmicion
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fuel: {//combustible
        type: DataTypes.STRING(50),
        allowNull: true
    },
    traction: {//tracción
        type: DataTypes.STRING(50),
        allowNull: true
    },   
    km_traveled: { // km recorrido
        type: DataTypes.STRING(50),
        allowNull: false
    },
    hrs_traveled: { // horas recorrido
        type: DataTypes.STRING(50),
        allowNull: false
    },
  
}, {
    tableName: 'product_technical_characteristics',
    timestamps: false
});
 
ProductTechnical.belongsTo(Products, {foreignKey: 'id_product'});
module.exports = ProductTechnical;
