const express = require('express');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const {newResponseJson} = require('../responseUtils');
const authenticateToken = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

 
const _dirname = './public/uploads';

router.post('/upload_image', async (req, res) => {
    const response = newResponseJson();
    response.error = false;
    response.msg = 'Carga exitosa';
    let status = 200;
    const id_product = req.query.id_product;

    let EDFile = req.files.file;

    EDFile.mv(`${_dirname}/${
        EDFile.name
    }`, err => {
        if (err) {
            response.error = false;
            status = 500;
            response.msg = "error al subir la imagen"
            res.status(status).json(response);
        } else {
            new PubControllers().registerImage(`${
                EDFile.name
            }`, id_product);
        }
    })

    res.status(status).json(response);
});

router.get('/see_image', function (req, res) {
    const img = req.query.image;
    let pathFoto;
    if (img) {
        pathFoto = path.resolve(`${_dirname}/${img}`);
        // Si la imagen existe
        const existe = fs.existsSync(pathFoto);
        if (! existe) {
            pathFoto = path.resolve(`${_dirname}/sin_producto.jpg`);
        }
    } else {
        pathFoto = path.resolve(`${_dirname}/sin_producto.jpg`);
    } res.sendFile(pathFoto);
});

router.delete('/delete_imagen',authenticateToken, async function (req, res) {
    const response = newResponseJson();
    let status = 400;
    const id_product = req.query.id_product;
    const name = req.query.name;
    if (id_product) {
        result =   await new PubControllers().deleteImagesByProductId(id_product,name) 
        console.log("resilt de delete",result)
    
              status = 200;
            response.error = false;  
            response.data = result; 
      
    } 
     res.status(status).json(response);
});

module.exports = router
