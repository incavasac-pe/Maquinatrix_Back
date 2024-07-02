'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_order', {
     id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      flow_order: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      payment_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      payment_status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      fee: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('payment_order', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'payment_order_id_user_fk', 
      references: {
        table: 'users', 
        field: 'id_user'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_order');
  }
};