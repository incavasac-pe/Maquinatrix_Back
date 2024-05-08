// models/Products.js

const {DataTypes} = require('sequelize');
const sequelize = require('../config/conexionDB');

const Status = require('./Status');
const Category = require('./Category');
const Users = require('./User');
const PublicationType = require('./PublicationType');
const MachineType = require('./MachineType');
const ProductType = require('./ProductType');
const MarcaType = require('./MarcaType');
const Products = sequelize.define('Products', {
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_publication_type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_product_type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_machine: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    visitt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default:0
    },
    interaction: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default:0
    },
     
}, {
    tableName: 'products',
    timestamps: false
});

Products.belongsTo(Status, {foreignKey: 'status_id'});
Products.belongsTo(Category, {foreignKey: 'id_category'});
Products.belongsTo(Users, {foreignKey: 'id_user'});
Products.belongsTo(PublicationType, {foreignKey: 'id_publication_type'});
Products.belongsTo(ProductType, {foreignKey: 'id_product_type'});
Products.belongsTo(MachineType, {foreignKey: 'id_machine'});   
module.exports = Products;
