'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make payment_method nullable
    await queryInterface.changeColumn('payment_order', 'payment_method', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    // Make payment_date nullable
    await queryInterface.changeColumn('payment_order', 'payment_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Make balance nullable
    await queryInterface.changeColumn('payment_order', 'balance', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: true,
    });

    // Make fee nullable
    await queryInterface.changeColumn('payment_order', 'fee', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert payment_method to not nullable
    await queryInterface.changeColumn('payment_order', 'payment_method', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    // Revert payment_date to not nullable
    await queryInterface.changeColumn('payment_order', 'payment_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Revert balance to not nullable
    await queryInterface.changeColumn('payment_order', 'balance', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
    });

    // Revert fee to not nullable
    await queryInterface.changeColumn('payment_order', 'fee', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
    });
  }
};