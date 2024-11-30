const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb'); // MongoDB Client
const cors = require('cors');
require('dotenv').config(); // Para cargar variables de entorno

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const likeRoutes = require('./routes/like');

// Leer la URI desde el archivo .env
const uri = process.env.MONGO_URI;

// Crear una instancia de MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Función para conectar a MongoDB
async function connectDB() {
  try {
    await client.connect(); // Conectar al servidor
    await client.db('admin').command({ ping: 1 }); // Hacer ping para verificar la conexión
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1); // Terminar la ejecución si hay un error
  }
}

// Llamar a la función de conexión
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Definir las rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/likes', likeRoutes);

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

module.exports = { client }; // Exportar el cliente MongoDB si se necesita usar en otros módulos

