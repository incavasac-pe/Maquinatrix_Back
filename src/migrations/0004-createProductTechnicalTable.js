'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_technical_characteristics', {
      id_product_technical: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id_product'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      weight: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      power: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      displacement: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      torque: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      mixed_consumption: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      transmission: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      fuel: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      traction: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      km_traveled: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      hrs_traveled: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_technical_characteristics');
  }
};