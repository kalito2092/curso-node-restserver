const express = require('express');
const app = express();
const Categoria = require('../models/categoria');
const { verificaToken, verificaRolAdmin } = require('../middlewares/autenticacion');

//=============================
//Mostrar todas las categorias
//=============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });
});




//=============================
//Mostrar una categoria por ID
//=============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, function(err, category) {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: category
        });

    });
});




//=============================
//Crear nueva categoria 
//=============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria();

    categoria.descripcion = body.descripcion;
    categoria.usuario = req.usuario._id;

    categoria.save((err, newCategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!newCategory) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: newCategory
        });

    });

});


//=============================
//Actualizar una categoria (descripcion)
//=============================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, { descripcion: body.descripcion }, { new: true, runValidators: true }, (err, categoryUpdated) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoryUpdated
        });

    });

});


//=============================
//Borrar una categoria
//=============================
app.delete('/categoria/:id', [verificaToken, verificaRolAdmin], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoryDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoryDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoría no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoryDeleted
        });

    });

});


module.exports = app;