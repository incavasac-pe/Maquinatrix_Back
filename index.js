const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');
///const sequelize = require('./src/config/conexionDB.js'); 

const PORT = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cors());
app.use(fileUpload());

// Routes
const routes = [
  require('./src/routers/users'),
  require('./src/routers/publication'),
  require('./src/routers/catalogos'),
  require('./src/routers/upload'),
  require('./src/routers/location'),
];

for (const route of routes)  {
  app.use(route);
}
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
/*sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
    insertData();

}).catch(error => {
  console.error('Error al sincronizar las tablas:', error);
});*/
// Default route
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});
