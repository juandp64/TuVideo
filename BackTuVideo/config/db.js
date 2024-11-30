const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error(`Error de conexión a MongoDB: ${err.message}`);
        process.exit(1); // Detiene la aplicación si no hay conexión
    }
};
module.exports = connectDB;
