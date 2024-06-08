const Category = require('../models/Category');
const PublicationType = require('../models/PublicationType');
const Products = require('../models/Products');
const ProductDetails = require('../models/ProductDetails');
const ProductTechnical = require('../models/ProductTechnical');
const ProductDimensions = require('../models/ProductDimensions');
const ProductRental = require('../models/ProductRental');
const ProductImages = require('../models/ProductImages');
const ProductArchivos = require('../models/ProductArchivos');
const MarcaType = require('../models/MarcaType');
const ModelType = require('../models/ModelType');
const { Op } = require('sequelize');
const Users = require('../models/User');
const Profile = require('../models/Profile');

Products.hasOne(ProductDetails, {
    foreignKey: 'id_product',
    as: 'product_details'
});

Products.hasOne(ProductTechnical, {
    foreignKey: 'id_product',
    as: 'product_technical_characteristics'
});
Products.hasOne(ProductDimensions, {
    foreignKey: 'id_product',
    as: 'product_dimension'
});
Products.hasOne(ProductRental, {
    foreignKey: 'id_product',
    as: 'product_rental'
});
ProductDetails.belongsTo(MarcaType, {
    foreignKey: 'id_marca',
    as: 'marca_type'
});
ProductDetails.belongsTo(ModelType, {
    foreignKey: 'id_model',
    as: 'model_type'
});
Products.belongsTo(PublicationType, {
    foreignKey: 'id_publication_type',
    as: 'publication_type'
});
PublicationType.hasMany(Products, {
    foreignKey: 'id_publication_type',
    as: 'publication_type'
});
Products.belongsTo(Category, {
    foreignKey: 'id_category',
    as: 'mainCategory'
});
Products.hasMany(ProductImages, {
    foreignKey: 'id_product',
    as: 'product_images'
});

ProductImages.belongsTo(Products, {
    foreignKey: 'id_product',
    as: 'product_images'
});
ProductArchivos.belongsTo(Products, {
    foreignKey: 'id_product',
    as: 'product_archivo'
});
Products.hasOne(Users, {
    foreignKey: 'id_user',
    as: 'users'
});

class PubControllers {

    async registerPub(id_publication_type, id_category, status_id, id_product_type, id_machine, title, description, id_user) {
        try {
            const result = await Products.create({
                title: title,
                location: 'location',
                description: description,
                id_publication_type: id_publication_type,
                id_category: id_category,
                id_product_type: id_product_type,
                id_machine: id_machine,
                create_at: new Date(),
                status_id: status_id,
                id_user: id_user
            });

            return result.id_product;
        } catch (error) {
            console.log(error);
        }
    }
    async updatePub(id_product, id_publication_type, id_category, id_product_type, id_machine, title, description,status_id) {
        try {
            const result = await Products.update(
                {
                    id_publication_type: id_publication_type,
                    id_category: id_category,
                    id_product_type: id_product_type,
                    id_machine: id_machine,
                    title: title,
                    description: description,
                    status_id: status_id
                },
                {
                    where: {
                        id_product: id_product
                    },
                    returning: true
                }
            );
            return result[1][0].id_product;
        } catch (error) {
            console.log(error);
        }
    }

    async registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery, facipay, contact_me, chasis_number, patent, region, city, factory_code, id_model, id_marca) {
        try {
            const result = await ProductDetails.create({
                id_product: id_product,
                price: price,
                brand: brand,
                model: model,
                year: year,
                condition: condition,
                mileage: mileage,
                engine_number: engine_number,
                warranty: warranty,
                owner: owner,
                delivery: delivery,
                pay_now_delivery: pay_now_delivery,
                facipay: facipay,
                contact_me: contact_me,
                chasis_number: chasis_number,
                patent: patent,
                region: region,
                city: city,
                factory_code: factory_code,
                id_model: id_model,
                id_marca: id_marca
            });

            return result.id_product_details;
        } catch (error) {
            console.log(error);
        }
    }


    async registerPubTechnical(id_product, weight, power, displacement, torque, mixed_consumption, transmission, fuel, traction, km_traveled, hrs_traveled) {
        try {
            const result = await ProductTechnical.create({
                id_product,
                weight,
                power,
                displacement,
                torque,
                mixed_consumption,
                transmission,
                fuel,
                traction,
                km_traveled,
                hrs_traveled
            });

            return result.id_product_technical;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery, facipay, contact_me, chasis_number, patent, region, city, factory_code, id_model, id_marca) {
        let response;
        try {
            const result = await ProductDetails.update({
                price: price,
                brand: brand,
                model: model,
                year: year,
                condition: condition,
                mileage: mileage,
                engine_number: engine_number,
                warranty: warranty,
                owner: owner,
                delivery: delivery,
                pay_now_delivery: pay_now_delivery,
                facipay: facipay,
                contact_me: contact_me,
                chasis_number: chasis_number,
                patent: patent,
                region: region,
                city: city,
                factory_code: factory_code,
                id_model: id_model,
                id_marca: id_marca
            }, {
                where: {
                    id_product: id_product
                }
            });

            response = result; // Retorna las filas actualizadas
        } catch (error) {
            response = error;
        }

        return response;
    }
    async updatePubTechnical(id_product, weight, power, displacement, torque, mixed_consumption, transmission, fuel, traction, km_traveled, hrs_traveled) {
       let response;
        try {
            const result = await ProductTechnical.update({
                weight,
                power,
                displacement,
                torque,
                mixed_consumption,
                transmission,
                fuel,
                traction,
                km_traveled,
                hrs_traveled
            }, {
                where: {
                    id_product: id_product
                }
            });

            response = result; // Retorna las filas actualizadas
        } catch (error) {
            response = error;
        }

        return response;
    }

    async registerPubDimensions(id_product,
        section_width,
        aspect_ratio,
        rim_diameter,
        extern_diameter,
        load_index,
        speed_index,
        maximum_load,
        maximum_speed,
        utqg,
        wear_rate,
        traction_index,
        temperature_index,
        runflat,
        terrain_type,
        tread_design,
        type_of_service,
        vehicle_type,
        season,
        land_type,
        others) {
        try {
            const result = await ProductDimensions.create({
                id_product,
                section_width,
                aspect_ratio,
                rim_diameter,
                extern_diameter,
                load_index,
                speed_index,
                maximum_load,
                maximum_speed,
                utqg,
                wear_rate,
                traction_index,
                temperature_index,
                runflat,
                terrain_type,
                tread_design,
                type_of_service,
                vehicle_type,
                season,
                land_type,
                others
            });

            return result.id_product_dimension;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePubDimensions(id_product,
        section_width, aspect_ratio, rim_diameter, extern_diameter, load_index,
        speed_index, maximum_load, maximum_speed, utqg, wear_rate,
        traction_index, temperature_index, runflat, terrain_type, tread_design, type_of_service, vehicle_type,
        season, land_type, others) {
        let response;
        try {
            const result = await ProductDimensions.update(
                {
                    section_width: section_width,
                    aspect_ratio: aspect_ratio,
                    rim_diameter: rim_diameter,
                    extern_diameter: extern_diameter,
                    load_index: load_index,
                    speed_index: speed_index,
                    maximum_load: maximum_load,
                    maximum_speed: maximum_speed,
                    utqg: utqg,
                    wear_rate: wear_rate,
                    traction_index: traction_index,
                    temperature_index: temperature_index,
                    runflat: runflat,
                    terrain_type: terrain_type,
                    tread_design: tread_design,
                    type_of_service: type_of_service,
                    vehicle_type: vehicle_type,
                    season: season,
                    land_type: land_type,
                    others: others
                },
                {
                    where: {
                        id_product: id_product
                    }
                }
            );

            response = result; // Retorna las filas actualizadas
        } catch (error) {
            response = error;
        }

        return response;
    }

    async registerPubRental(id_product, Scheduled_Maintenance, Supply_Maintenance, Technical_Visit, operational_certificate, operational_certificate_date
        , operational_certificate_attachment, Insurance_Policy, Insurance_Policy_attachment, delivery, operator_included, rental_contract, rental_guarantee) {
        try {
            const result = await ProductRental.create({
                id_product, Scheduled_Maintenance,
                Supply_Maintenance, Technical_Visit,
                operational_certificate, operational_certificate_date
                , operational_certificate_attachment, Insurance_Policy,
                Insurance_Policy_attachment, delivery,
                operator_included, rental_contract, rental_guarantee
            });

            return result.id_product_rental;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePubRental(id_product, Scheduled_Maintenance, Supply_Maintenance, Technical_Visit, operational_certificate, operational_certificate_date, operational_certificate_attachment, Insurance_Policy, Insurance_Policy_attachment, delivery, operator_included, rental_contract, rental_guarantee) {
        let response;
        try {
        
          const result = await ProductRental.update({
              Scheduled_Maintenance: Scheduled_Maintenance,
              Supply_Maintenance: Supply_Maintenance,
              Technical_Visit: Technical_Visit,
              operational_certificate: operational_certificate,
              operational_certificate_date: operational_certificate_date,
              operational_certificate_attachment: operational_certificate_attachment,
              Insurance_Policy: Insurance_Policy,
              Insurance_Policy_attachment: Insurance_Policy_attachment,
              delivery: delivery,
              operator_included: operator_included,
              rental_contract: rental_contract,
              rental_guarantee: rental_guarantee
            },
            {
              where: {
                id_product: id_product
              }
            }
          );
      
        
          response = result; // Retorna las filas actualizadas
        } catch (error) {
            response = error;
        }

        return response;
      }


    async getPublicationsDetails(id) {
        try {
            const results = await ProductDetails.findAll({
                where: {
                    id_product: id
                }
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getPublicationsTechnical(id) {
        try {
            const results = await ProductTechnical.findAll({
                where: {
                    id_product: id
                }
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getPublicationsDimensions(id) {
        try {
            const results = await ProductDimensions.findAll({
                where: {
                    id_product: id
                }
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getPublicationsRental(id) {
        try {
            const results = await ProductRental.findAll({
                where: {
                    id_product: id
                }
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }
    async getPublicationsPanel(search, tpublicacion, category, fcreacion, region, id_user) {
        try { 
          const whereClause = {
            status_id: {
              [Op.ne]: 8
            }
          };
      
          if (search) {
            whereClause.title = {
              [Op.iLike]: `%${search}%`
            };
          }
      
          if (region) {
            whereClause.location = {
              [Op.iLike]: `%${region}%`
            };
          }
      
          if (tpublicacion) {
            whereClause['id_publication_type'] = tpublicacion;
          }
      
          if (category) {
            whereClause['id_category'] = category;
          }
      
          if (fcreacion) {
            whereClause.create_at = fcreacion;
          }
      
          const userWhereClause = {};
            if (id_user != undefined && id_user != '') {
            userWhereClause['id_user_ext'] = id_user;
            }
      
          const results = await Products.findAll({
            attributes: [
              'id_product',
              'status_id',
              'title',
              'PublicationType.type_pub',
              'Category.category',
              [
                Products.sequelize.literal(`TO_CHAR(create_at, 'DD Mon YYYY, HH:MI am')`), 'create_at_formatted'
              ]
            ],
            include: [
              {
                model: PublicationType,
                attributes: ['type_pub'],
              },
              {
                model: Category,
                attributes: ['category'],
              },
              {
                model: Users,
                attributes: ['id_user', 'id_type_user'],
                include: [
                  {
                    model: Profile,
                    attributes: ['full_name', 'last_name', 'razon_social', 'id_user_ext'],
                    where: Object.keys(userWhereClause).length > 0 ? userWhereClause : undefined,
                    required: true
                  }
                ],
                required: true
              }
            ],
            where: whereClause,
            order: [['id_product']]
          });
      
          return results;
        } catch (error) {
          console.log(error);
        }
      }


    async getPublicationsPortalCount(search, tpublicacion, category, status_id, id_machine, id_product_type) {
        try {
            const whereClause = {}

            if (status_id != null) {
                whereClause.status_id = status_id;
            } 
            
            if (search) {
                whereClause.title = {
                    [Op.iLike]: `%${search}%`
                };
            }
            if (tpublicacion) {
                whereClause.id_publication_type = tpublicacion;
            }

            if (category) {
                whereClause.id_category = category;
            }
            if (id_machine) {
                whereClause.id_machine = id_machine;
            }
            if (id_product_type) {
                whereClause.id_product_type = id_product_type;
            }

            let orderClause = ['id_product'];

            const results = await Products.findAll({
                attributes: [
                    'id_product',
                ],

                where: whereClause,
                order: orderClause
            });
            return results;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getPublicationsPortal(search, tpublicacion, category, limit, price_max, price_min, region, id_user, status_id, recent, id_machine, id_product_type, offset) {
        try {
            const whereClause = {}

            if (status_id != null) {
                whereClause.status_id = status_id;
            }
            if (id_user != null) {
                whereClause.id_user = id_user;
            }

            if (search && search != '') {
                whereClause.title = {
                    [Op.iLike]: `%${search}%`
                };               
            }
            if (region && region != '0') {
                whereClause.location = {
                    [Op.iLike]: `%${region}%`
                };
            }

            if (tpublicacion) {
                whereClause.id_publication_type = tpublicacion;
            }

            if (category && category != '0') {
                whereClause.id_category = category;
            }
            if (id_machine && category != '0') {
                whereClause.id_machine = id_machine;
            }
            if (id_product_type && id_product_type != '0') {
                whereClause.id_product_type = id_product_type;
            }

            let orderClause = ['id_product'];

            if (price_min) {
                orderClause = [['product_details', 'price', 'ASC']];
            } if (recent) {
                orderClause = [['id_product', 'DESC']];
            }
            const results = await Products.findAll({
                attributes: [
                    'id_product',
                    'title',
                    'status_id',
                    'description',
                    'visitt',
                    'interaction',
                    'location',
                    [
                        Products.sequelize.literal(`TO_CHAR(create_at, 'DD MM YYYY, HH:MI am')`), 'create_at_formatted'
                    ],
                ],
                include: [
                    {
                        model: ProductDetails,
                        as: 'product_details',
                        attributes: {
                            exclude: ['id_product']
                        },
                    },
                    {
                        model: ProductTechnical,
                        as: 'product_technical_characteristics',
                        attributes: {
                            exclude: ['id_product']
                        }
                    },
                    {
                        model: ProductDimensions,
                        as: 'product_dimension',
                        attributes: {
                            exclude: ['id_product']
                        }
                    }, {
                        model: ProductRental,
                        as: 'product_rental',
                        attributes: {
                            exclude: ['id_product']
                        }
                    },
                     {
                        model: PublicationType,
                    }, {
                        model: Category,
                        attributes: ['category']
                    }, {
                        model: ProductImages,
                        as: 'product_images',
                        attributes: ['image_name','cover'],
                        order: [['path', 'ASC']],
                    },
                    {
                        model: Users,
                        include: [
                            {
                                model: Profile
                            }
                        ]
                    }

                ],
                where: whereClause,
                order: orderClause,
                limit: limit,
                offset: offset
            });
            return results;
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPublicationsPanelDetails(id) {
        try {
            const results = await Products.findAll({
                where: {
                    id_product: id,
                    status_id: {
                        [Op.ne]: 8
                    }
                },
                include: [
                    {
                        model: ProductDetails,
                        as: 'product_details'
                    },
                    {
                        model: ProductTechnical,
                        as: 'product_technical_characteristics'
                    },
                    {
                        model: ProductDimensions,
                        as: 'product_dimension'
                    },
                    {
                        model: ProductRental,
                        as: 'product_rental'
                    },
                    {
                        model: PublicationType,
                        as: 'publication_type',
                        attributes: ['type_pub', 'description']
                    }, {
                        model: Category,
                        as: 'mainCategory'
                    }, {
                        model: Users,
                        attributes: ['id_user', 'id_type_user'],
                        include: [
                            {
                                model: Profile,
                                attributes: ['full_name', 'last_name', 'razon_social'],
                            }
                        ]
                    },
                    {
                        model: ProductImages,
                        as: 'product_images',
                        attributes: ['image_name'],
                        order: [['path', 'ASC']],
                    },
                ],
                order: [
                    ['id_product', 'ASC']
                ]
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getPublicationsDetailsImagen(id) {
        try {
            const results = await ProductImages.findAll({
                where: {
                    id_product: id
                },
                attributes: ['image_name', 'cover'],
                order: [['path', 'ASC']]
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePublicationData(location, description, title, id_product) {
        try {
            const result = await Products.update({
                location: location,
                description: description,
                title: title
            }, {
                where: {
                    id_product: id_product
                }
            });

            return result
        } catch (error) {
            console.log(error);
        }
    }

    async updatePublication(status, id_product) {
        try {
            const result = await Products.update({
                status_id: status
            }, {
                where: {
                    id_product: id_product
                }
            });

            return result
        } catch (error) {
            console.log(error);
        }
    }

    async updatePublicationVisit(id_product, type) {
        try {
            const product = await Products.findOne({
                where: {
                    id_product: id_product
                }
            });
            let updatedProduct;
            if (product) {
                if (type == 1) {
                    updatedProduct = await product.update({
                        visitt: product.visitt + 1
                    });
                } else {
                    updatedProduct = await product.update({
                        interaction: product.interaction + 1
                    });
                }
                return updatedProduct;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery, facipay, contact_me, chasis_number, patent, region, city, factory_code, id_model, id_marca) {
        let response;
        try {
            const result = await ProductDetails.update({
                price: price,
                brand: brand,
                model: model,
                year: year,
                condition: condition,
                mileage: mileage,
                engine_number: engine_number,
                warranty: warranty,
                owner: owner,
                delivery: delivery,
                pay_now_delivery: pay_now_delivery,
                facipay: facipay,
                contact_me: contact_me,
                chasis_number: chasis_number,
                patent: patent,
                region: region,
                city: city,
                factory_code: factory_code,
                id_model: id_model,
                id_marca: id_marca
            }, {
                where: {
                    id_product: id_product
                }
            });

            response = result; // Retorna las filas actualizadas
        } catch (error) {
            response = error;
        }

        return response;
    }
    async registerImage(image_name, id_product, path, cover) {
        try {
            const existingImage = await ProductImages.findOne({ where: { path, id_product } });
            if (existingImage) {
                const result = await ProductImages.update(
                    { creation_date: new Date() },
                    { where: { image_name, id_product } }
                );

                return result;
            } else {
                // La imagen no existe, realizar una inserción 
                const result = await ProductImages.create({
                    id_product: id_product,
                    image_name: image_name,
                    path: path,
                    cover: cover,
                    creation_date: new Date()
                });

                return result;
            }
        } catch (error) {
            return false;

        }
    }

    async deleteImagesByProductIdAll(id_producto) {
        try {
            // Eliminar los registros de imágenes por el id_producto
            const result = await ProductImages.destroy({
                where: {
                    id_product: id_producto
                }
            });

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteImagesByProductId(id_producto, name) {
        try {
            // Eliminar los registros de imágenes por el id_producto
            const result = await ProductImages.destroy({
                where: {
                    id_product: id_producto,
                    image_name: name
                }
            });

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async registerArchivo(archivo_name, id_product, path) {
        try {
            const existingImage = await ProductArchivos.findOne({ where: { path, id_product } });
            if (existingImage) {
                const result = await ProductArchivos.update(
                    { creation_date: new Date() },
                    { where: { archivo_name, id_product } }
                );

                return result;
            } else {
                // el pdf no existe, realizar una inserción 
                const result = await ProductArchivos.create({
                    id_product: id_product,
                    archivo_name: archivo_name,
                    path: path,
                    creation_date: new Date()
                });

                return result;
            }
        } catch (error) {
            return false;

        }
    }


}

module.exports = PubControllers;
