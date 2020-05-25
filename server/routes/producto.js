const express = require('express');
const app = express();
const Producto = require('../models/producto');
const { verificaToken } = require('../middlewares/autenticacion');

// =============================
//Buscar productos
// =============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        })

});


// =============================
//Obtener todos los productos
// =============================
app.get('/productos', verificaToken, (req, res) => {

    let start = Number(req.query.start) || 0;
    let limit = Number(req.query.limit) || 5;

    Producto.find({ disponible: true })
        .skip(start)
        .limit(limit)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});



// =============================
//Obtener un producto por id
// =============================
app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });

        });

});



// =============================
//Crear un nuevo producto
// =============================
app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;
    let producto = new Producto();

    producto.nombre = body.nombre;
    producto.precioUni = body.precio;
    producto.descripcion = body.descripcion;
    producto.categoria = body.categoria;
    producto.usuario = req.usuario._id;

    producto.save((err, nuevoProducto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: nuevoProducto
        });

    });

});


// =============================
//Actualizar un producto
// =============================
app.put('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let camposActualizados = {
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion

    }

    Producto.findByIdAndUpdate(id, camposActualizados, { new: true, runValidators: true }, (err, productoActualizado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoActualizado
        });

    });


});



// =============================
//Borrar un producto
// =============================
app.delete('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    //Borrado por actualizacion del campo disponible
    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true }, (err, productoBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoBorrado
        });

    });

});



module.exports = app;