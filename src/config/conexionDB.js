require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: 'postgres'
});

module.exports = sequelize;
