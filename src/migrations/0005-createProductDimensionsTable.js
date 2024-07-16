'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_dimension', {
      id_product_dimension: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id_product'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      section_width: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      aspect_ratio: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      rim_diameter: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      extern_diameter: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      load_index: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      speed_index: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      maximum_load: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      maximum_speed: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      utqg: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      wear_rate: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      traction_index: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      temperature_index: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      runflat: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      terrain_type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      tread_design: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      type_of_service: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      vehicle_type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      season: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      land_type: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      others: {
        type: Sequelize.STRING(50),
        allowNull: true
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_dimension');
  }
};