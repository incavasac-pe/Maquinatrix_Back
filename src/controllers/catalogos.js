 
const Category = require('../models/Category');
const PublicationType = require('../models/PublicationType');
class CatalogoControllers {
     
 
    async getCategory() {
        try {
          const results = await Category.findAll({
            where: {
              status_id: 1
            }
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
    
  /*   async getTipoPublicacion() {       
        let results = await db.query(`
        select * from maqdb.publication_type pt  where status_id = 1`).catch(console.log); 
        return results ;
    }   */
}

module.exports =  CatalogoControllers;
 
