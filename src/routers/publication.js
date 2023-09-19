const express = require("express");  
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const { newResponseJson } = require('../responseUtils');

router.get('/list_publications_panel', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    const search = req.query.search ?? '';
    const tpublicacion = req.query?.tpublicacion?? '';
    const category = req.query?.category?? '';
    const fcreacion = req.query?.fcreacion?? '';
  
    result = await new PubControllers().getPublicationsPanel(search,tpublicacion,category,fcreacion) 
 
       if (result.rowCount > 0) {
          response.error = false;
          response.msg = 'Publicaciones encontradas';
          response.count = result.rowCount;
          response.data = result.rows;
          status = 200;
       } else {
          response.msg = 'No se encontraron publicaciones';
       }
    
 
    res.status(status).json(response);
 });
  
router.get('/list_publications_panel_details', async (req, res) => {
   const response = newResponseJson();
   let status = 400;
   const id = req.query.id;
   result = await new PubControllers().getPublicationsPanelDetails(id) 

      if (result.rowCount > 0) {
         response.error = false;
         response.msg = 'Publicaciones detalles encontradas';
         response.count = result.rowCount;
         response.data = result.rows;
         status = 200;
      } else {
         response.msg = 'No se encontraron publicaciones';
      }
   

   res.status(status).json(response);
});


router.get('/list_publications_imagen', async (req, res) => {
   const response = newResponseJson();
   let status = 400;
   const id = req.query.id;
   result = await new PubControllers().getPublicationsDetailsImagen(id) 

      if (result.rowCount > 0) {
         response.error = false;
         response.msg = 'Publicaciones imagenes encontradas';
         response.count = result.rowCount;
         response.data = result.rows;
         status = 200;
      } else {
         response.msg = 'No se encontraron publicaciones';
      }
   

   res.status(status).json(response);
});

 
router.post('/register_publication',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false; 
 
    const { title,  id_publication_type, id_category, status_id } = req.body;
 
    // Validar los datos de entrada
    if (title.trim() == '' || status_id == null || id_publication_type == null) {
       flag = true;
       response.msg = 'Campos vacíos';
    }
  
    if (!flag) {
        result = await new PubControllers().registerPub(title,  id_publication_type, id_category, req.user.id_user) 
       
          if (result.rowCount > 0) {
             response.error = false;
             response.msg = 'Publicación registrada exitosamente';
             response.data = { id_product: result.rows[0].id_product };
             status = 201;
          } else {
             response.msg = 'Error al registrar la publicación';
          }
 
    }
 
    res.status(status).json(response);
 });
 
 router.post('/register_product_details',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;
 
    const { id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery } = req.body;
 
    if (id_product == '' || price  === '' || brand == '' || model.trim() === '' || year === '' || condition.trim() === ''
    || mileage  == '' || engine_number == '' || warranty.trim() === '' || owner.trim() === '' || delivery.trim() === '' || pay_now_delivery.trim() === '') {
      flag = true;
      response.msg = 'Campos vacíos';
     }
  
    if (!flag) {
      let result;
         exist  = await new PubControllers().getPublicationsDetails(id_product);
        
         if (exist.rowCount == 0) {
                result = await new PubControllers().registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery);
             } else{
                result = await new PubControllers().updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery);
             }

          if (result.rowCount > 0) {
             response.error = false;
             response.msg = 'Detalle de la publicación registrado exitosamente';
             response.data = { id_product_details: result.rows[0].id_product_details };
             status = 201;
          } else {
             response.msg = 'Error al registrar el detalle de la publicación';
          }
       
    }
 
    res.status(status).json(response);
 });

 router.put('/update_publication_status',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
 
    const { status_id,id_product } = req.body; 
 
       result = await new PubControllers().updatePublication(status_id, id_product)
 
       if (result.rowCount > 0) {
          response.error = false;
          response.msg = 'Estado de la publicación actualizado exitosamente';
          response.data = result.rows;
          status = 200;
       } else {
          response.msg = 'No se encontró la publicación con el ID especificado';
       }
    
 
    res.status(status).json(response);
 });

 router.put('/update_publication_basic',authenticateToken, async (req, res) => {
   const response = newResponseJson();
   let status = 400;

   const { location,description,title, id_product} = req.body; 

      result = await new PubControllers().updatePublicationData(location,description,title, id_product)

      if (result.rowCount > 0) {
         response.error = false;
         response.msg = 'Estado de la publicación actualizado exitosamente';
         response.data = result.rows;
         status = 200;
      } else {
         response.msg = 'No se encontró la publicación con el ID especificado';
      }
   

   res.status(status).json(response);
}); 


router.get('/list_publications', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    const search = req.query.search ?? '';
    const tpublicacion = req.query?.tpublicacion?? '';
    const category = req.query?.category?? ''; 
    const limit = req.query?.limit?? ''; 
    const price_max = req.query?.price_max?? ''; 
    const price_min = req.query?.price_min?? ''; 

    result = await new PubControllers().getPublicationsPortal(search,tpublicacion,category,limit,price_max,price_min) 
 
       if (result.rowCount > 0) {
          response.error = false;
          response.msg = 'Publicaciones encontradas';
          response.count = result.rowCount;
          response.data = result.rows;
          status = 200;
       } else {
          response.msg = 'No se encontraron publicaciones';
       }
    
 
    res.status(status).json(response);
 });

module.exports = router;
