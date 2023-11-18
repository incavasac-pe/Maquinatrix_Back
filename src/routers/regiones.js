const express = require("express"); 
const router = express.Router();
const {newResponseJson} = require('../responseUtils');

router.get('/list_regiones', async (req, res) => {
    
const RegionesChile = Object.freeze({
    ARICA_PARINACOTA: 'Arica y Parinacota',
    TARAPACA: 'Tarapacá',
    ANTOFAGASTA: 'Antofagasta',
    ATACAMA: 'Atacama',
    COQUIMBO: 'Coquimbo',
    VALPARAISO: 'Valparaíso',
    METROPOLITANA: 'Metropolitana de Santiago',
    O_HIGGINS: "O'Higgins",
    MAULE: 'Maule',
    NUBLE: 'Ñuble',
    BIO_BIO: 'Biobío',
    ARAUCANIA: 'La Araucanía',
    LOS_RIOS: 'Los Ríos',
    LOS_LAGOS: 'Los Lagos',
    AYSEN: 'Aysén del General Carlos Ibáñez del Campo',
    MAGALLANES: 'Magallanes y de la Antártica Chilena'
  });
    const response = newResponseJson();
    let status = 200; 

    const regiones = Object.values(RegionesChile);
    
    response.error = false;
    response.msg = 'Regiones';
    response.count = regiones.length;
    response.data = regiones; 

    res.status(status).json(response);
});
module.exports = router;