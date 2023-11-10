// models/Category.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');

const Category = sequelize.define('Category', {
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    tableName: 'category',
    timestamps: false
});

Category.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});

module.exports = Category;
