const jwt = require('jsonwebtoken');

//==================
// Verificar Token
//==================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};


//==================
// Verificar Rol Admin
//==================
let verificaRolAdmin = (req, res, next) => {

    if (req.usuario.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no tiene permisos de administrador'
            }
        });
    }

    next();

};


//==================
// Verificar Token en URL
//==================

let verificaTokenUrl = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

}


module.exports = {
    verificaToken,
    verificaRolAdmin,
    verificaTokenUrl
}