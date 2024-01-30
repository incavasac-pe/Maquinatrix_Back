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

    if (result.length > 0) {
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

    if (result.length > 0) {
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

    if (result.length > 0) {
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
    if (title.trim() == '' || description.trim() == ''|| status_id == null || id_publication_type == null || id_product_type == null
    || id_machine == null || id_category== null ) {
        flag = true;
        response.msg = 'Faltan campos por completar';
    }

    if (! flag) {
        result = await new PubControllers().registerPub(id_publication_type, id_category, status_id,id_product_type,id_machine,title,description,req.user.id_user);
        console.LO
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
        engine_number,
        warranty,
        owner,
        delivery,
        pay_now_delivery,
        facipay,
        contact_me
    } = req.body;

    /*if (id_product == '' || price === '' || brand == '' || model.trim() === '' || year === '' || condition.trim() === '' || mileage == '' || engine_number == '' || warranty.trim() === '' || owner.trim() === '' || delivery.trim() === '' || pay_now_delivery.trim() === '') {
        flag = true;
        response.msg = 'Campos vacíos';
    }*/

    if (! flag) {
        let result_up,
            result_inser;

        exist = await new PubControllers().getPublicationsDetails(id_product);
        if (exist.length > 0) {
            result_up = await new PubControllers().updatePublicationDetail(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me);
        } else {
            result_inser = await new PubControllers().registerPubDetails(id_product, price, brand, model, year, condition, mileage, engine_number, warranty, owner, delivery, pay_now_delivery,facipay,contact_me);
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

    result = await new PubControllers().getPublicationsPortal(search, tpublicacion, category, limit, price_max, price_min,region)

    if (result.length > 0) {
        response.error = false;
        response.msg = 'Publicaciones encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron publicaciones';     
    }

    res.status(status).json(response);
});

module.exports = router;
