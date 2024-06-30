// models/PaymentOrder.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Users = require('./User');
const FlowStatus = require('../constants/flow_statuses');

const PaymentOrder = sequelize.define('PaymentOrder', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    flow_order: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    payment_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    payment_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: FlowStatus.PENDING
    },
    currency: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    fee: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    tableName: 'payment_order',
    timestamps: false
});

PaymentOrder.belongsTo(Users, {foreignKey: 'id_user'});
module.exports = PaymentOrder;