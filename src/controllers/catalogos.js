const Category = require('../models/Category');
const PublicationType = require('../models/PublicationType');
const ProductType = require('../models/ProductType');
const MachineType = require('../models/MachineType');


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
    async getMachine() {
        try {
            const results = await MachineType.findAll({
                where: {
                    status_id: 1
                }
            });
            return results;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CatalogoControllers;
