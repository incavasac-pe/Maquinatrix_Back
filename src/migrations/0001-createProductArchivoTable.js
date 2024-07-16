'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_archivo', {
      id_archivo: {
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
      archivo_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      path: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      creation_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_archivo');
  }
};