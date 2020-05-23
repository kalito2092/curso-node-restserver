const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');


app.post('/login', function(req, res) {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!user) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, user.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        //Generando el token
        let token = jwt.sign({
            usuario: user
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        res.json({
            ok: true,
            usuario: user,
            token

        });


    });


});



module.exports = app;