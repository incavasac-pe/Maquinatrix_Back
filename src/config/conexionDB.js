const Sequelize = require('sequelize');
const env = process.env.NODE_ENVIROMMENT || 'production';
const config = require(__dirname + '/../config/config.json')[env];

  
const sequelize = new Sequelize( config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

module.exports = sequelize;