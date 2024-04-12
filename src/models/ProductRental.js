// models/Products.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');

const Products = require('./Products');

const ProductRental = sequelize.define('ProductRental', {
    id_product_rental: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Scheduled_Maintenance: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    Supply_Maintenance: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    Technical_Visit: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    operational_certificate: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    operational_certificate_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operational_certificate_attachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Insurance_Policy: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    Insurance_Policy_attachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delivery: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    operator_included: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    rental_contract: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    rental_guarantee: {
      type: DataTypes.STRING(3),
      allowNull: true
    }
  }, {
    tableName: 'product_rental',
    timestamps: false
  });

  
  ProductRental.belongsTo(Products, {foreignKey: 'id_product'});

module.exports = ProductRental;
