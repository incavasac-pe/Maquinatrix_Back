const Status = require('./Status');
const Roles = require('./Roles');
const PublicationType = require('./PublicationType');
const Category = require('./Category');
const Users = require('./User');
const UserRoles = require('./UserRoles');
const TypeUser = require('./TypeUser');
const TypeDoc = require('./TypeDoc');
const insertData = async () => {
    try { 
            // Insertar registros en la tabla 'TypeDoc'
            await TypeDoc.bulkCreate([
            {
                id_type_doc: 1,
                type_doc: 'RUT', 
                status_id: 1
            }, {
                id_type_doc: 2,
                type_doc: 'PASAPORTE', 
                status_id: 1
            },
            {
                id_type_doc: 3,
                type_doc: 'RUT EMPRESA', 
                status_id: 1
            },
            {
                id_type_doc: 4,
                type_doc: 'RUT REPRESENTANTE LEGAL', 
                status_id: 1
            }
        ]);
         // Insertar registros en la tabla 'TypeUser'
         await TypeUser.bulkCreate([
            {
                id_type_user: 1,
                type_user: 'PARTICULAR',
                description: 'TIPO DE USUARIO PARTICULAR ',
                status_id: 1
            }, {
                id_type_user: 2,
                type_user: 'EMPRESA',
                description: 'TIPO DE USUARIO EMPRESA',
                status_id: 1
            } 
        ]);
        // Insertar registros en la tabla 'status'
        await Status.bulkCreate([
            {
                id_status: 1,
                status: 'A',
                description: 'CATALOGOS ACTIVOS'
            },
            {
                id_status: 2,
                status: 'I',
                description: 'CATALOGOS INACTIVO'
            },
            {
                id_status: 3,
                status: 'AU',
                description: 'USUARIOS ACTIVOS'
            },
            {
                id_status: 4,
                status: 'IU',
                description: 'USUARIOS INACTIVOS'
            }, {
                id_status: 5,
                status: 'PU',
                description: 'USUARIOS PENDIENTES VERIFICACION'
            }, {
                id_status: 6,
                status: 'AP',
                description: 'PUBLICACIONES ACTIVAS O APROBADAS'
            }, {
                id_status: 7,
                status: 'IP',
                description: 'PUBLICACIONES INACTIVAS O SUSPENDIDAS'
            }, {
                id_status: 8,
                status: 'P',
                description: 'PUBLICACIONES ELIMINADAS'
            }
        ]);

        // Insertar registros en la tabla 'roles'
        await Roles.bulkCreate([
            {
                id_roles: 1,
                roles: 'ADMIN',
                description: 'ACCESO TOTAL A TODOS LOS MODULOS DEL SISTEMA',
                status_id: 1
            }, {
                id_roles: 2,
                roles: 'SUBADMIN',
                description: 'ACCESO TOTAL A LOS MODULOS EXCLUYENDO LOS DE ADMINISTRADOR',
                status_id: 1
            },  {
                id_roles: 3,
                roles: 'CUSTOMERS',
                description: 'VISUALIZAR PUBLICACIONES',
                status_id: 1
            }
                ]);
       
        // Insertar registros en la tabla 'publication_type'
        await PublicationType.bulkCreate([
            {
                id_publication_type: 1,
                type_pub: 'Arrendar',
                description: 'ARRIENDO',
                status_id: 1
            }, {
                id_publication_type: 2,
                type_pub: 'Comprar',
                description: 'COMPRAR',
                status_id: 1
            }
        ]);

        // Insertar registros en la tabla 'category'
        await Category.bulkCreate([
            {
                id_category: 1,
                category: 'Maquinaria y Equipos',
                description: 'Incluye los equipo como Retroexcavadora',
                status_id: 1
            }, {
                id_category: 2,
                category: 'Repuestos',
                description: 'Incluye los repuestos en genera',
                status_id: 1
            }, {
                id_category: 3,
                category: 'Neumatico',
                description: 'Incluye los neumaticos en genera',
                status_id: 1
            }, {
                id_category: 4,
                category: 'Productos y Accesorios',
                description: 'Incluye los productos y accesorios en genera',
                status_id: 1
            },
            {
                id_category: 5,
                category: 'Equipos y herramientas',
                description: 'Incluye los herramients y accesorios en genera',
                status_id: 1
            }
        ]);

        // Insertar registros en la tabla 'users'
        await Users.bulkCreate([{
                id_user: 1,
                email: 'norbelysnaguanagua21@gmail.com',
                password: '3d857893e075f0c19e5fb3c1149b7113',
                status_id: 3
            }]);

        // Insertar registros en la tabla 'user_roles'
        await UserRoles.bulkCreate([{
                id_user: 1,
                id_role: 1
            }]);

        console.log('Datos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar los datos:', error);
    }
};
module.exports = insertData;
