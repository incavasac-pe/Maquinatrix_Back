const Category = require('../models/Category');
const PublicationType = require('../models/PublicationType');
const ProductType = require('../models/ProductType');
const MachineType = require('../models/MachineType');
const MarcaType = require('../models/MarcaType');
const ModelType = require('../models/ModelType');

class CatalogoControllers {


    async getCategory() {
        try {
            const results = await Category.findAll({
                where: {
                    status_id: 1
                }, 
                 order: [
                    ['id_category', 'ASC']
                ]
            });
            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async getTipoPublicacion() {
        try {
            const results = await PublicationType.findAll({
                where: {
                    status_id: 1
                }
            });
            return results;
        } catch (error) {
            console.log(error);
        }
    }
    async getIndustry() {
        try {
            const results = await ProductType.findAll({
                where: {
                    status_id: 1
                }
            });
            return results;
        } catch (error) {
            console.log(error);
        }
    }
    async  getMachine(id_product_type) {
        try {
          const whereCondition = {
            status_id: 1
          };
      
          if (id_product_type !== null) {
            whereCondition.id_product_type = id_product_type;
          }
      
          const results = await MachineType.findAll({
            where: whereCondition
          });
      
          return results;
        } catch (error) {
          console.log(error);
        }
      }
      
    async  getMarca(id_product_type) {
        try {
          const whereCondition = {
            status_id: 1
          };
      
          if (id_product_type !== null) {
            whereCondition.id_product_type = id_product_type;
          }
      
          const results = await MarcaType.findAll({
            where: whereCondition
          });
      
          return results;
        } catch (error) {
          console.log(error);
        }
      }

      async  getModel(id_product_type) {
        try {
          const whereCondition = {
            status_id: 1
          };
      
          if (id_product_type !== null) {
            whereCondition.id_product_type = id_product_type;
          }
      
          const results = await ModelType.findAll({
            where: whereCondition
          });
      
          return results;
        } catch (error) {
          console.log(error);
        }
      }
}

module.exports = CatalogoControllers;
