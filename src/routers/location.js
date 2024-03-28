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



router.get('/list_city', async (req, res) => {
     
  const response = newResponseJson();
  let status = 200; 
  const region = req.query.region;
       
    try {
      const resp = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      const data = resp.data;

      // Filtrar las ciudades de Chile
      const chile = data.filter(country => country.name.common === 'Chile'); 

      const cities = chile[0].altSpellings.slice(2); // Ignorar los alias iniciales
      response.count = cities.length;
      response.data = cities; 
      
      response.error = false;
      response.msg = 'Regiones';
    
      } catch (error) {
        console.error('Error al obtener las ciudades:', error.message);
        response.error = true;
        status = 400; 
        response.msg = 'Error al obtener las ciudades:', error.message
      }
   
     res.status(status).json(response);
  });
module.exports = router;