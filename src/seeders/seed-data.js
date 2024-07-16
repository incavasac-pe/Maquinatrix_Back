'use strict';

const TypeDoc = require('../models/TypeDoc');
const TypeUser = require('../models/TypeUser');
const Status = require('../models/Status');
const Category = require('../models/Category');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Insertar registros en la tabla 'TypeDoc'
      await TypeDoc.bulkCreate([
        {
          id_type_doc: 1,
          type_doc: 'RUT',
          status_id: 1
        },
        {
          id_type_doc: 2,
          type_doc: 'Pasaporte',
          status_id: 1
        }
      ]);

      // Insertar registros en la tabla 'TypeUser'
      await TypeUser.bulkCreate([
        {
          id_type_user: 1,
          type_user: 'PARTICULAR',
          description: 'TIPO DE USUARIO PARTICULAR',
          status_id: 1
        },
        {
          id_type_user: 2,
          type_user: 'EMPRESA',
          description: 'TIPO DE USUARIO EMPRESA',
          status_id: 1
        }
      ]);

      // Insertar registros en la tabla 'Status'
      await Status.bulkCreate([
        {
          id_status: 9,
          status: 'R',
          description: 'PUBLICACIONES REVISION'
        },
        {
          id_status: 10,
          status: 'B',
          description: 'PUBLICACIONES BORRADOR'
        }
      ]);

      // Insertar registros en la tabla 'Category'
      await Category.bulkCreate([
        {
          id_category: 5,
          category: 'Equipos y herramientas',
          description: 'Incluye los herramients y accesorios en genera',
          status_id: 1
        }
      ]);

      console.log('Datos insertados correctamente.');
    } catch (error) {
      console.error('Error al insertar los datos:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Eliminar todos los registros insertados en las tablas
      await TypeDoc.destroy({ where: {} });
      await TypeUser.destroy({ where: {} });
      await Status.destroy({ where: {} });
      await Category.destroy({ where: {} });

      console.log('Datos eliminados correctamente.');
    } catch (error) {
      console.error('Error al eliminar los datos:', error);
    }
  }
};