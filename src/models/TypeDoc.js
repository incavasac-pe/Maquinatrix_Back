// models/Roles.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');
const Status = require('./Status');

const TypeDoc = sequelize.define('TypeDoc', {
    id_type_doc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type_doc: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
  
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'type_document',
    timestamps: false
});

TypeDoc.belongsTo(Status, {
    foreignKey: 'status_id',
    targetKey: 'id_status'
});

module.exports = TypeDoc;
