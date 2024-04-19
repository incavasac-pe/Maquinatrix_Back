const express = require("express");
const authenticateToken = require('../middleware/auth');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const {newResponseJson} = require('../responseUtils');

router.get('/list_publications_panel', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    const search = req.query.search ?? '';
    const tpublicacion = req.query ?. tpublicacion ?? '';
    const region = req.query ?. region ?? '';
    const category = req.query ?. category ?? '';
    const fcreacion = req.query ?. fcreacion ?? ''; 

    result = await new PubControllers().getPublicationsPanel(search, tpublicacion, category, fcreacion,region)

    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Publicaciones encontradas';
        response.count = result.length;
        response.data = result;
    } else {
        response.msg = 'No se encontraron publicaciones';
    }


    res.status(status).json(response);
});

router.get('/list_publications_panel_details', async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    const id = req.query.id; 
    result = await new PubControllers().getPublicationsPanelDetails(id);

    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Publicaciones detalles encontradas';
        response.count = result.length;
        response.data = result;
        status = 200;
    } else {
        response.msg = 'No se encontraron publicaciones';
    } 

    res.status(status).json(response);
});


router.get('/list_publications_imagen', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    const id = req.query.id;
    result = await new PubControllers().getPublicationsDetailsImagen(id)
    result?.sort((a, b) => {
        if (a.cover && !b.cover) {
          return -1; 
        } else if (!a.cover && b.cover) {
          return 1;
        } else {
          return 0; 
        }
      });
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Publicaciones imagenes encontradas';
        response.count = result.length;
        response.data = result;
    } else {
        response.msg = 'No se encontraron publicaciones';
    }

    res.status(status).json(response);
});


router.post('/register_publication', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;

    const {id_publication_type, id_category, status_id,id_product_type,id_machine,title,description} = req.body;

    // Validar los datos de entrada
    if (title.trim() == '' || status_id == null || id_publication_type == null || id_product_type == null
    || id_machine == null || id_category== null ) {
        flag = true;
        response.msg = 'Faltan campos por completar';
    }

    if (! flag) {
        result = await new PubControllers().registerPub(id_publication_type, id_category, status_id,id_product_type,id_machine,title,description,req.user.id_user);
     
        if (result != undefined) {
            response.error = false;
            response.msg = 'Publicación registrada exitosamente';
            response.data = {
                id_product: result
            };
            status = 201;
        } else {
            response.msg = 'Error al registrar la publicación';
        }
    }
    res.status(status).json(response);
});

router.post('/register_product_details', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;

    const {
        id_product,
        price,
        brand,
        model,
        year,
        condition,
        mileage,
        engine_number,chasis_number,patent,
        warranty,
        owner,
        delivery,
        pay_now_delivery,
        facipay,
        contact_me,
        region,
        city,
        factory_code,
    } = req.body;

 
    if (! flag) {
        let result_up,
            result_inser;

        exist = await new PubControllers().getPublicationsDetails(id_product);
        if (exist.length > 0) {
            result_up = await new PubControllers().updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me,chasis_number,patent,region,city,factory_code);
        } else {
            result_inser = await new PubControllers().registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me,chasis_number,patent,region,city,factory_code);
        }

        if (result_inser != undefined || result_up == 1) {
            response.error = false;
            response.msg = 'Detalle de la publicación registrado exitosamente';
            response.data = {
                id_product_details: id_product
            };
            status = 201;
        } else {
            response.msg = 'Error al registrar el detalle de la publicación';
        }

    }

    res.status(status).json(response);
});


router.post('/register_product_technical', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;

    const {
        id_product,weight,power,displacement,torque,mixed_consumption,transmission,fuel,traction,km_traveled,hrs_traveled        
    } = req.body;
 
    if (! flag) {
        let result_up,
            result_inser;

        exist = await new PubControllers().getPublicationsTechnical(id_product);
        if (exist.length > 0) {
         result_up = await new PubControllers().updatePubTechnical( id_product,weight,power,displacement,torque,mixed_consumption,transmission,fuel,traction,km_traveled,hrs_traveled );
        } else {
            result_inser = await new PubControllers().registerPubTechnical( id_product,weight,power,displacement,torque,mixed_consumption,transmission,fuel,traction,km_traveled,hrs_traveled);
        }

        if (result_inser != undefined || result_up == 1) {
            response.error = false;
            response.msg = 'Detalle de la publicación técnica registrado exitosamente';
            response.data = {
                id_product_technical: id_product
            };
            status = 201;
            res.status(status).json(response);
        } else {
            response.msg = 'Error al registrar el detalle técnico de la publicación';
            res.status(status).json(response);
        }

    }
 
});

router.post('/register_product_dimensions', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;

    const {
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
    } = req.body;
 
    if (! flag) {
        let result_up,
            result_inser;

        exist = await new PubControllers().getPublicationsDimensions(id_product);
        if (exist.length > 0) {
         result_up = await new PubControllers().updatePubDimensions( id_product,
            section_width,  aspect_ratio,  rim_diameter,   extern_diameter,
            load_index, speed_index, maximum_load,  maximum_speed,
            utqg, wear_rate, traction_index, temperature_index,
            runflat, terrain_type, tread_design,  type_of_service, vehicle_type, season,  land_type,  others );
        } else {
            result_inser = await new PubControllers().registerPubDimensions( id_product,
                section_width,   aspect_ratio,  rim_diameter, extern_diameter,load_index,
                speed_index,   maximum_load,  maximum_speed,   utqg,   wear_rate,
                traction_index,  temperature_index,  runflat,
                terrain_type,    tread_design,       type_of_service,    vehicle_type,
                season,      land_type,         others  );
        }

        if (result_inser != undefined || result_up == 1) {
            response.error = false;
            response.msg = 'Detalle de la publicación dimensions registrado exitosamente';
            response.data = {
                id_product_dimensions: id_product
            };
            status = 201;
            res.status(status).json(response);
        } else {
            response.msg = 'Error al registrar el detalle dimensions de la publicación';
            res.status(status).json(response);
        }
    } 
});

router.post('/register_product_rental', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;
    let flag = false;

    const {
       id_product,Scheduled_Maintenance,Supply_Maintenance ,Technical_Visit ,operational_certificate ,operational_certificate_date
      ,operational_certificate_attachment,Insurance_Policy,Insurance_Policy_attachment ,delivery ,operator_included,rental_contract,rental_guarantee  } = req.body;
 
    if (! flag) {
        let result_up,
            result_inser;

       /* exist = await new PubControllers().getPublicationsDimensions(id_product);
        if (exist.length > 0) {
         result_up = await new PubControllers().updatePubDimensions( id_product,
            section_width,  aspect_ratio,  rim_diameter,   extern_diameter,
            load_index, speed_index, maximum_load,  maximum_speed,
            utqg, wear_rate, traction_index, temperature_index,
            runflat, terrain_type, tread_design,  type_of_service, vehicle_type, season,  land_type,  others );
        } else {*/
            result_inser = await new PubControllers().registerPubRental(  id_product,Scheduled_Maintenance,Supply_Maintenance ,Technical_Visit ,operational_certificate ,operational_certificate_date
                ,operational_certificate_attachment,Insurance_Policy,Insurance_Policy_attachment ,delivery ,operator_included,rental_contract,rental_guarantee );
        //}

        if (result_inser != undefined || result_up == 1) {
            response.error = false;
            response.msg = 'Detalle de la publicación rental registrado exitosamente';
            response.data = {
                id_product_rental: id_product
            };
            status = 201;
            res.status(status).json(response);
        } else {
            response.msg = 'Error al registrar el detalle rental de la publicación';
            res.status(status).json(response);
        }
    } 
});
router.put('/update_publication_status', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;

    const {status_id, id_product} = req.body;

    result = await new PubControllers().updatePublication(status_id, id_product)
    if (result == 1) {
        response.error = false;
        response.msg = 'Estado de la publicación actualizado exitosamente';
        response.data = result.rows;
        status = 200;
    } else {
        response.msg = 'No se encontró la publicación con el ID especificado';
    }

    res.status(status).json(response);
});

router.put('/update_publication_basic', authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 400;

    const {location, description, title, id_product} = req.body;

    result = await new PubControllers().updatePublicationData(location, description, title, id_product)
    if (result == 1) {
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
    let status = 200;
    const search = req.query.search ?? '';
    const tpublicacion = req.query ?. tpublicacion ?? '';
    const category = req.query ?. category ?? '';
    const limit = req.query ?. limit ?? '';
    const price_max = req.query ?. price_max ?? '';
    const price_min = req.query ?. price_min ?? '';
    const region = req.query ?. region ?? '';
    const status_id = req.query.status_id ?? null;
    const brand = req.query ?. brand ?? null;
    const model = req.query ?. model ?? null;
    const condition = req.query ?. condition ?? null;
    const recent = req.query ?. recent ?? null;


    result = await new PubControllers().getPublicationsPortal(search, tpublicacion, category, limit, price_max, price_min,region,null,status_id,recent)
    if(brand!= null){
        result = await filterByBrand(result,brand);
      console.log("result brand ",result)
      }
      if(model!= null){
        result = await filterByModel(result,model);
       console.log("result model",result)
      }
      if(condition!= null){
        result = await filterByCondition(result,condition);
        console.log("result condition",result)
      }
      if(condition!= null){
        result = await filterByCondition(result,condition);
        console.log("result condition",result)
      }
      
    if (result?.length > 0 ) {
        response.error = false;
        response.msg = 'Publicaciones encontradas para mostrar al portal';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron publicaciones';     
    }

    res.status(status).json(response);
});

router.get('/list_publications_byuser',authenticateToken, async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    const search = req.query.search ?? '';
    const tpublicacion = req.query ?. tpublicacion ?? '';
    const category = req.query ?. category ?? '';
    const limit = req.query ?. limit ?? '';
    const price_max = req.query ?. price_max ?? '';
    const price_min = req.query ?. price_min ?? '';
    const region = req.query ?. region ?? '';
    const id_user = req.query?.id_user ?? null;
    const status_id = req.query.status_id ?? null;
  

    result = await new PubControllers().getPublicationsPortal(search, tpublicacion, category, limit, price_max, price_min,region,id_user,status_id)
       
  
    if (result?.length > 0  ) {
        response.error = false;
        response.msg = 'Publicaciones encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron publicaciones';     
    }

    res.status(status).json(response);
});

router.put('/visity_public', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
  
    const id_product = req.query.id_product ?? null;  

    result = await new PubControllers().updatePublicationVisit(id_product)
    if (!result) {
         response.msg = 'No se encontraron publicaciones';  
    }else{   
        response.error = false;
        response.msg = 'Publicacion visitada';
        response.count = result.length;
        response.data = result; 
    }  

    res.status(status).json(response);
});

  function filterByBrand(data, brand) {
    return data.filter(item => item.product_details.brand == brand);
  }
  function filterByModel(data, model) {
    return data.filter(item => item.product_details.model == model);
  }
  function filterByCondition(data, condition) {
    return data.filter(item => item.product_details.condition == condition);
  }
   
module.exports = router;
