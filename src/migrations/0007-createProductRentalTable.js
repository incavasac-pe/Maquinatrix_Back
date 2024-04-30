'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_rental', {
      id_product_rental: {
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
      Scheduled_Maintenance: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      Supply_Maintenance: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      Technical_Visit: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      operational_certificate: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      operational_certificate_date: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      operational_certificate_attachment: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      Insurance_Policy: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      Insurance_Policy_attachment: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      delivery: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      operator_included: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      rental_contract: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      rental_guarantee: {
        type: Sequelize.STRING(3),
        allowNull: true
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_rental');
  }
};