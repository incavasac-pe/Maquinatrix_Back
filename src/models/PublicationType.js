// models/PublicationType.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');

const PublicationType = sequelize.define('PublicationType', {
    id_publication_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type_pub: {
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
    tableName: 'publication_type',
    timestamps: false
});

PublicationType.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});

module.exports = PublicationType;
