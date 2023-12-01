const express = require('express');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const {newResponseJson} = require('../responseUtils');
const authenticateToken = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
const webp = require('webp-converter'); 
const sharp = require('sharp');
const _dirname = './public/uploads';
 
router.post('/upload_image', async (req, res) => {
    const response = newResponseJson();
    response.error = false;
    response.msg = 'Carga exitosa';
    let status = 200;
    const id_product = req.query.id_product;
   // const name_prd = req.query.name;
    const orden = req.query.orden;
    let EDFile = req.files.file;
 
   
    //const newFileName = concatenateWithNumber(EDFile.name); // Aquí debes implementar la lógica para generar el nuevo nombre de archivo
 const newFileName = eliminarCaracteresEspeciales(EDFile.name)
  const imageType = EDFile.mimetype.split('/')[1]; 
    const originalFilePath = path.join(_dirname, newFileName 
        + '.' + imageType);
 //   const convertedFilePath = path.join(_dirname, newFileName + '.webp');
     

    EDFile.mv(originalFilePath,  async (err) => {
      if (err) {
        response.error = false;
        status = 500;
        response.msg = 'error al subir la imagen';
      } else {
        try {
        //  await convertToWebP(originalFilePath, convertedFilePath);
          
          //fs.unlinkSync(originalFilePath); // Eliminar la imagen original
          new PubControllers().registerImage(newFileName +  '.' + imageType, id_product, orden);
        } catch (error) {
          response.error = false;
          status = 500;
          response.msg = 'error al convertir la imagen a WebP';
        }
      }  
      
    });
 
res.status(status).json(response);
  });

  async function convertToWebP(inputPath, outputPath) {
    await sharp(inputPath).toFormat('webp').toFile(outputPath);
  }
  function eliminarCaracteresEspeciales(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return '';
    }
   
    const regex = /[^\w]/gi; 
    const resultado = string.replace(regex, ''); 
    return resultado;
  } 

function concatenateWithNumber(inputString) {
    const strings = inputString.split(' ');
    const concatenatedString = strings.join('_');   
    return concatenatedString;
  }

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

router.delete('/delete_all',authenticateToken, async function (req, res) {
    const response = newResponseJson();
    let status = 400;
    const id_product = req.query.id_product;
 
    if (id_product) {
        result =   await new PubControllers().deleteImagesByProductIdAll(id_product) 
        status = 200;
        response.error = false;  
        response.data = result;  
    } 
     res.status(status).json(response);
});

router.delete('/delete_imagen',authenticateToken, async function (req, res) {
    const response = newResponseJson();
    let status = 400;
    const id_product = req.query.id_product;
    const name = req.query.name;
    if (id_product) {
        result =   await new PubControllers().deleteImagesByProductId(id_product,name)   
        status = 200;
        response.error = false;  
        response.data = result;  
    } 
     res.status(status).json(response);
});

module.exports = router
