// models/ProductDetails.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Products = require('./Products');

const ProductDimensions = sequelize.define('ProductDimensions', {
    id_product_dimension: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },     
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    section_width: { //ancho seccion
        type: DataTypes.STRING(50),
        allowNull: true
    },
    aspect_ratio: { //relacion de aspecto
        type: DataTypes.STRING(20),
        allowNull: true
    },
    rim_diameter: { //Diámetro de la llanta
        type: DataTypes.STRING(20),
        allowNull: true
    },
    extern_diameter: { //Diámetro externo*
        type: DataTypes.STRING(20),
        allowNull: true
    },
    load_index: { //indice de carga
        type: DataTypes.STRING(20),
        allowNull: true
    },
    speed_index: { //Índice de velocidad*
        type: DataTypes.STRING(20),
        allowNull: true
    },
    maximum_load: {//Carga máxima
        type: DataTypes.STRING(20),
        allowNull: true
    },
    maximum_speed: {//Velocidad máxima
        type: DataTypes.STRING(20),
        allowNull: true
    },   
    utqg: { //  UTQG
        type: DataTypes.STRING(50),
        allowNull: true
    },
    wear_rate: { // Índice de desgaste
        type: DataTypes.STRING(50),
        allowNull: true
    },
    traction_index: { // Índice de tracción
        type: DataTypes.STRING(50),
        allowNull: true
    },
    temperature_index: { // Índice de temperatura
        type: DataTypes.STRING(50),
        allowNull: true
    },
    runflat: { // tecnologia 
        type: DataTypes.STRING(20),
        allowNull: true
    },
    terrain_type: { // tipo terreno 
        type: DataTypes.STRING(20),
        allowNull: true
    },
    terrain_type: { // tipo terreno 
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tread_design: { // Diseño de la banda de rodadura
        type: DataTypes.STRING(20),
        allowNull: true
    }, 
    //uso y condicion del producto 
    type_of_service: { // tipo de servicio
        type: DataTypes.STRING(20),
        allowNull: true
    }, 
    vehicle_type: { // Vehicle Type
        type: DataTypes.STRING(20),
        allowNull: true
    }, 
    season:{ // Temporada invierno,verano
        type: DataTypes.STRING(20),
        allowNull: true
    }, 
    land_type:{   //Tipo de terreno
        type: DataTypes.STRING(20),
        allowNull: true
    }, 
    others: { //Tipo de construcción y u otros
        type: DataTypes.STRING(50),
        allowNull: true
    },
  
}, {
    tableName: 'product_dimension',
    timestamps: false
});
 
ProductDimensions.belongsTo(Products, {foreignKey: 'id_product'});
module.exports = ProductDimensions;
