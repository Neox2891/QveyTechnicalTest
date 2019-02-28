/**
 * Configuracion entorno - desarrollo/produccion
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Configuración puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Caducidad token
 */
process.env.CADUCIDAD_TOKEN = '48h';

/**
 * SEED de autenticación
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

/**
 * Configuración base de datos
 */
let urlDb;

if (process.env.NODE_ENV === 'dev') {
    urlDb  = 'mongodb://localhost:27017/timeTrkDb';
} else {
    urlDb = process.env.MONGO_URI;
}

process.env.URLDB = urlDb;