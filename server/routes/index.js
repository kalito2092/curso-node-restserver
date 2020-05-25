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

module.exports = app;