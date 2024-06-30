// models/Purchase.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');

const Product = require('./Products');
const PaymentOrder = require('./PaymentOrder');

const Purchase = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_payment_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    purchase_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    tableName: 'purchase',
    timestamps: false
});

Purchase.belongsTo(PaymentOrder, {foreignKey: 'id_payment_order'});
Purchase.belongsTo(Product, {foreignKey: 'id_product'});

module.exports = Purchase;