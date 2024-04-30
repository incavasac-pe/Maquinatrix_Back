'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('product_details', 'region', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'city', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'factory_code', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'chasis_number', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'patent', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'id_marca', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('product_details', 'id_model', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product_details', 'region');
    await queryInterface.removeColumn('product_details', 'city');
    await queryInterface.removeColumn('product_details', 'factory_code');
    await queryInterface.removeColumn('product_details', 'chasis_number');
    await queryInterface.removeColumn('product_details', 'patent');
    await queryInterface.removeColumn('product_details', 'id_marca');
    await queryInterface.removeColumn('product_details', 'id_model');
  }
};