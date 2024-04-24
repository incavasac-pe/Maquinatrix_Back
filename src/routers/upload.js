const express = require('express');
const router = express.Router();
const PubControllers = require('../controllers/publication');
const {newResponseJson} = require('../responseUtils');
const authenticateToken = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
//const webp = require('webp-converter'); 
//const sharp = require('sharp');
const _dirname = './public/uploads';
const _dirname_pdf = './public/uploads_pdf';

router.post('/upload_image', async (req, res) => {
    const response = newResponseJson();
    response.error = false;
    response.msg = 'Carga exitosa';
    let status = 200;
    const id_product = req.query.id_product;
    const cover = req.query.cover ?? false;
    const orden = req.query.orden;
    let EDFile = req.files?.file;
 
   
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
       const result_img =  await new PubControllers().registerImage(newFileName +  '.' + imageType, id_product, orden,cover);
          if(!result_img){
            response.error = false;
            status = 500;
            response.msg = 'error al insertar en la BD la imagen';
          }
    
      } catch (error) {
        console.log("errorrrrrrrrrr",error)
          response.error = false;
          status = 500;
          response.msg = 'error al convertir la imagen a WebP' +error;
        }
       
      }  
      res.status(status).json(response);
    });
  
  });
 

  router.post('/upload_pdf', async (req, res) => {
    const response = newResponseJson();
    response.error = false;
    response.msg = 'Carga exitosa';
    let status = 200;
    const id_product = req.query.id_product;
    const type = req.query.type;
    const newFileName = req.files?.file?.name;
    const pdfFile = req.files?.file;
   
    // Verificar si se proporcionó un archivo PDF
    if (!pdfFile || !newFileName.endsWith('.pdf')) {
      response.error = true;
      status = 400;
      response.msg = 'No se proporcionó un archivo PDF válido';
      return res.status(status).json(response);
    }
      // Verificar el tamaño del archivo
      const fileSizeInBytes = pdfFile.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convertir a MB
      const maxFileSizeInMB = 1;
    
      if (fileSizeInMB > maxFileSizeInMB) {
        response.error = true;
        status = 400;
        response.msg = `El archivo excede el tamaño máximo permitido (${maxFileSizeInMB} MB)`;
        return res.status(status).json(response);
      }
    // Mover el archivo PDF a la carpeta de destino
    const uploadPath = path.join(_dirname_pdf);
    const filePath = path.join(uploadPath, newFileName);
  
    pdfFile.mv(filePath, async (err) => {
      if (err) {
        console.error(err);
        response.error = true;
        status = 500;
        response.msg = 'Error al subir el archivo PDF';
      } else {
        try {
          const result_img =  await new PubControllers().registerArchivo(newFileName, id_product,type);
          if(!result_img){
            response.error = false;
            status = 500;
            response.msg = 'error al pdf en la BD';
          }
        } catch (error) {
          console.error(error);
          response.error = true;
          status = 500;
          response.msg = 'Error al procesar el archivo PDF';
        }
      }
  
      res.status(status).json(response);
    });
  });

  async function convertToWebP(inputPath, outputPath) {
   // await sharp(inputPath).toFormat('webp').toFile(outputPath);
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
