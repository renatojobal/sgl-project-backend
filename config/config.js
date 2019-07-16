// * Configuraciones de la base de datos

let url_database;
//url_data_base = 'mongodb://admin:admin123@ds263816.mlab.com:63816/sga2';
if (process.env.NODE_ENV == 'dev') {
    url_database = 'mongodb://localhost:27017/sga3';
} else {
    url_database = process.env.MONGO_URI;
}
process.env.url_database = url_database

// * Configuraciones de puerto

process.env.PORT = process.env.PORT || 3000;


// SEED 
process.env.SEED = process.env.SEED || "seed-secreto";
// CADUCIDAD

process.env.CADUCIDAD = process.env.CADUCIDAD || '15d'