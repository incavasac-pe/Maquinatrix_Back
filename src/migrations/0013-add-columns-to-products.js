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

    await queryInterface.addColumn('products', 'id_marca', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'marca_type',
        key: 'id_marca'
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

    await queryInterface.addColumn('products', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'id_product_type');
    await queryInterface.removeColumn('products', 'id_marca');
    await queryInterface.removeColumn('products', 'visitt');
    await queryInterface.removeColumn('products', 'interaction');
    await queryInterface.removeColumn('products', 'createdAt');
  }
};