const express = require("express");
const router = express.Router();
const CatalogoControllers = require('../controllers/catalogos');
const {newResponseJson} = require('../responseUtils');

router.get('/list_category', async (req, res) => {
    const response = newResponseJson();
    let status = 200;

    result = await new CatalogoControllers().getCategory()
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'categorias encontradas';
        response.count = result.length;
        response.data = result;
     
    } else {
        response.msg = 'No se encontraron categorias';
    }


    res.status(status).json(response);
});


router.get('/list_tipo_pub', async (req, res) => {
    const response = newResponseJson();
    let status = 200;

    result = await new CatalogoControllers().getTipoPublicacion();
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Tipo publicacion encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron tipo publicacion';
    }


    res.status(status).json(response);
});


router.get('/list_industry', async (req, res) => {
    const response = newResponseJson(); 
    let status = 200;
    result = await new CatalogoControllers().getIndustry();
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Tipo industrias encontradas';
        response.count = result.length;
        response.data = result;
        
    } else {
        response.msg = 'No se encontraron industrias';
    }


    res.status(status).json(response);
});

router.get('/list_machine', async (req, res) => {
    const response = newResponseJson(); 
    let status = 200;
    const id_product_type = req.query.id_product_type ?? null;
    result = await new CatalogoControllers().getMachine(id_product_type);
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Tipo máquinas encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron máquinas';
    }


    res.status(status).json(response);
});
router.get('/list_marca', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    const id_product_type = req.query.id_product_type ?? null;
    result = await new CatalogoControllers().getMarca(id_product_type);
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Marcas encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron Marcas';
    } 

    res.status(status).json(response);
});

router.get('/list_model', async (req, res) => {
    const response = newResponseJson();
    let status = 200;
    const id_product_type = req.query.id_product_type ?? null;
    result = await new CatalogoControllers().getModel(id_product_type);
    if (result?.length > 0) {
        response.error = false;
        response.msg = 'Modelo encontradas';
        response.count = result.length;
        response.data = result; 
    } else {
        response.msg = 'No se encontraron Modelo';
    } 

    res.status(status).json(response);
});
module.exports = router;
