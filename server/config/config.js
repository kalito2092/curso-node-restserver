// ====================
// Puerto
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
// Entorno
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// Vencimiento de token 
// ====================
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = '30 days';


// ====================
// Seed de autenticación
// ====================
process.env.SEED = process.env.SEED || 'seed-desarrollo';


// ====================
// Base de datos
// ====================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_DB_URL;

}

process.env.URL_DB = urlDB;


// ====================
// Google Client ID
// ====================
process.env.CLIENT_ID = process.env.CLIENT_ID || '294222542237-vr5hkind7gs72k4cpj8vun5bbvehabp9.apps.googleusercontent.com';