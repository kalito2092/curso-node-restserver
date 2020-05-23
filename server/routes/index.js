const express = require('express');
const app = express();

//añade las rutas del usuario.js
app.use(require('./usuario'));
//añade las rutas del login.js
app.use(require('./login'));

module.exports = app;