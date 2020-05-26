const express = require('express');
const app = express();

//añade las rutas del usuario.js
app.use(require('./usuario'));

//añade las rutas del login.js
app.use(require('./login'));

//añade las rutas de categoria.js
app.use(require('./categoria'));

//añade las rutas de producto.js
app.use(require('./producto'));

//añade las rutas de upload.js
app.use(require('./upload'));

//añade las rutas de imagenes.js
app.use(require('./imagenes'));


module.exports = app;