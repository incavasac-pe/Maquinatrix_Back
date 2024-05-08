'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('machine_type', {
      id_machine: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_product_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_type',
          key: 'id_product_type'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'status',
          key: 'id_status'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('machine_type');
  }
};