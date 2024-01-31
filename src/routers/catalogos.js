const express = require("express");
const router = express.Router();
const CatalogoControllers = require('../controllers/catalogos');
const {newResponseJson} = require('../responseUtils');

router.get('/list_category', async (req, res) => {
    const response = newResponseJson();
    let status = 500;

    result = await new CatalogoControllers().getCategory()
    if (result.length > 0) {
        response.error = false;
        response.msg = 'categorias encontradas';
        response.count = result.length;
        response.data = result;
        status = 200;
    } else {
        response.msg = 'No se encontraron categorias';
    }


    res.status(status).json(response);
});


router.get('/list_tipo_pub', async (req, res) => {
    const response = newResponseJson();
    let status = 500;

    result = await new CatalogoControllers().getTipoPublicacion();
    if (result.length > 0) {
        response.error = false;
        response.msg = 'Tipo publicacion encontradas';
        response.count = result.length;
        response.data = result;
        status = 200;
    } else {
        response.msg = 'No se encontraron tipo publicacion';
    }


    res.status(status).json(response);
});


router.get('/list_industry', async (req, res) => {
    const response = newResponseJson();
    let status = 500;

    result = await new CatalogoControllers().getIndustry();
    if (result.length > 0) {
        response.error = false;
        response.msg = 'Tipo industrias encontradas';
        response.count = result.length;
        response.data = result;
        status = 200;
    } else {
        response.msg = 'No se encontraron industrias';
    }


    res.status(status).json(response);
});

router.get('/list_machine', async (req, res) => {
    const response = newResponseJson();
    let status = 500;

    result = await new CatalogoControllers().getMachine();
    if (result.length > 0) {
        response.error = false;
        response.msg = 'Tipo máquinas encontradas';
        response.count = result.length;
        response.data = result;
        status = 200;
    } else {
        response.msg = 'No se encontraron máquinas';
    }


    res.status(status).json(response);
});

module.exports = router;
