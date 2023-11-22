const Category = require('../models/Category');
const PublicationType = require('../models/PublicationType');
const Products = require('../models/Products');
const ProductDetails = require('../models/ProductDetails');
const ProductImages = require('../models/ProductImages');
const {Op} = require('sequelize');

Products.hasOne(ProductDetails, {
    foreignKey: 'id_product',
    as: 'product_details'
});
ProductDetails.belongsTo(Products, {
    foreignKey: 'id_product',
    as: 'product_details'
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
class PubControllers {

    async registerPub(title, id_publication_type, id_category, id_user) {
        try {
            const result = await Products.create({
                title: title,
                location: '',
                description: '',
                id_publication_type: id_publication_type,
                id_category: id_category,
                create_at: new Date(),
                status_id: '6',
                id_user: id_user
            });

            return result.id_product;
        } catch (error) {
            console.log(error);
        }
    }

    async registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me) {
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
                contact_me: contact_me
            });

            return result.id_product_details;
        } catch (error) {
            console.log(error);
        }
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

    async getPublicationsPanel(search, tpublicacion, category, fcreacion,region) { 
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
                whereClause['$PublicationType.id_publication_type$'] = tpublicacion;
            }

            if (category) {
                whereClause['$Category.id_category$'] = category;
            }

            if (fcreacion) {
                whereClause.create_at = fcreacion;
            }

            const results = await Products.findAll({
                attributes: [
                    'id_product',
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
                        attributes: ['type_pub']
                    }, {
                        model: Category,
                        attributes: ['category']
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


    async getPublicationsPortal(search, tpublicacion, category, limit, price_max, price_min,region) { 
        try {
            const whereClause = {
                status_id: {
                    [Op.ne]: 8
                }
            };
            if (search) {
              whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } }, 
              ];
            }
            if (region) {
                whereClause.location = {
                    [Op.iLike]: `%${region}%`                  
               }; 
            }

            if (tpublicacion) {
                whereClause.id_publication_type = tpublicacion;
            }

            if (category) {
                whereClause.id_category = category;
            }

            let orderClause = [['id_product']];


            if (price_max) {
                orderClause = [['product_details', 'price', 'ASC']];
            } else if (price_min) {
                orderClause = [['product_details', 'price', 'DESC']];
            }

            const results = await Products.findAll({
                attributes: [
                    'id_product',
                    'title',
                    'description',
                    'location',
                    [
                        Products.sequelize.literal(`TO_CHAR(create_at, 'DD Mon YYYY, HH:MI am')`), 'create_at_formatted'
                    ],
                ],
                include: [
                    {
                        model: ProductDetails,
                        as: 'product_details',
                        attributes: {
                            exclude: ['id_product']
                        }
                    }, {
                        model: PublicationType,
                        //attributes: ['type_pub']
                    }, {
                        model: Category,
                        attributes: ['category']
                    }, {
                        model: ProductImages,
                        as: 'product_images',
                        attributes: ['image_name'],
                        limit: 1

                    }
                ],
                where: whereClause,
                order: orderClause,
                limit: limit
            });

            return results;
        } catch (error) {
            console.log(error);
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
                attributes: [
                    'id_product',
                    'title',
                    'description',
                    'location',
                    [
                        Products.sequelize.fn('TO_CHAR', Products.sequelize.col('create_at'), 'DD Mon YYYY, HH:MI am'),
                        'create_at_formatted'
                    ]
                ],
                include: [
                    {
                        model: ProductDetails,
                        as: 'product_details'
                    }, {
                        model: PublicationType,
                        as: 'publication_type',
                        attributes: ['type_pub']
                    }, {
                        model: Category,
                        as: 'mainCategory'
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
                attributes: ['image_name']
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

    async updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me) {
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
                contact_me: contact_me
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
    async registerImage(image_name, id_product) {
        try { 
            const existingImage = await ProductImages.findOne({ where: { image_name, id_product } });    
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
                    creation_date: new Date()
                });
    
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteImagesByProductId(id_producto,name) {
        try {
            // Eliminar los registros de imágenes por el id_producto
            const result = await ProductImages.destroy({
                where: {
                    id_product: id_producto,
                    image_name :name
                }
            });
    
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = PubControllers;
