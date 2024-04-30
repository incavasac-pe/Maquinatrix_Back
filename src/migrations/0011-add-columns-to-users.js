'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'codepassword', {
      type: Sequelize.STRING(10),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'id_type_user', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'type_user',
        key: 'id_type_user'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'codepassword');
    await queryInterface.removeColumn('users', 'id_type_user');
  }
};