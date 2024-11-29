const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const likeRoutes = require('./routes/like');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
