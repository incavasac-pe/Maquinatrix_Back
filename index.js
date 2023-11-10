const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');
const sequelize = require('./src/config/conexionDB');

require('./src/models/Status.js');
require('./src/models/User.js');
require('./src/models/Category.js');
require('./src/models/Roles.js');
require('./src/models/Profile.js');
require('./src/models/PublicationType.js');
require('./src/models/UserVerify.js');
require('./src/models/UserRoles.js');
require('./src/models/Products.js');
require('./src/models/ProductImages.js');
require('./src/models/ProductDetails.js');
const insertData = require('./src/models/insertData.js');

const PORT = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(fileUpload());

// Routes
const routes = [
  require('./src/routers/users'),
  require('./src/routers/publication'),
  require('./src/routers/catalogos'),
  require('./src/routers/upload')
];

for (const route of routes)  {
  app.use(route);
}
sequelize.sync().then(() => {
  console.log('Tablas sincronizadas');
    insertData();
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });
}).catch(error => {
  console.error('Error al sincronizar las tablas:', error);
});
// Default route
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});
