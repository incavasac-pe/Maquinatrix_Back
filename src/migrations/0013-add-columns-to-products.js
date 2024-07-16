'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'id_product_type', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'product_type',
        key: 'id_product_type'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('products', 'id_machine', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'machine_type',
        key: 'id_machine'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('products', 'visitt', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    });

    await queryInterface.addColumn('products', 'interaction', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }); 
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'id_product_type');
    await queryInterface.removeColumn('products', 'id_machine');
    await queryInterface.removeColumn('products', 'visitt');
    await queryInterface.removeColumn('products', 'interaction');
  }
};