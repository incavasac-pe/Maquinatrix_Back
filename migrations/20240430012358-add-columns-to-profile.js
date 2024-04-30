'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('profile', 'last_name', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'id_type_doc', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'type_docs',
        key: 'id_type_doc'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('profile', 'num_doc', {
      type: Sequelize.STRING(15),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'address', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'razon_social', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'rutCompany', {
      type: Sequelize.STRING(20),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'FullNameRepreLegal', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'LastNameRepreLegal', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'RutRepreLegal', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'emailRepreLegal', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    await queryInterface.addColumn('profile', 'id_user_ext', {
      type: Sequelize.STRING(9),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('profile', 'last_name');
    await queryInterface.removeColumn('profile', 'id_type_doc');
    await queryInterface.removeColumn('profile', 'num_doc');
    await queryInterface.removeColumn('profile', 'address');
    await queryInterface.removeColumn('profile', 'razon_social');
    await queryInterface.removeColumn('profile', 'rutCompany');
    await queryInterface.removeColumn('profile', 'FullNameRepreLegal');
    await queryInterface.removeColumn('profile', 'LastNameRepreLegal');
    await queryInterface.removeColumn('profile', 'RutRepreLegal');
    await queryInterface.removeColumn('profile', 'emailRepreLegal');
    await queryInterface.removeColumn('profile', 'id_user_ext');
  }
};