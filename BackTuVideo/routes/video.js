const express = require('express');
const { protect } = require('../middleware/auth');
const Video = require('../models/Video');
const MuxVideo = require('../config/mux');
const router = express.Router();

// Subir un video
router.post('/upload', protect, async (req, res) => {
    const { title, description, visibility } = req.body; // Asegúrate de pasar estos datos desde el front-end

    try {
        // Crear un nuevo asset de video en Mux
        const muxAsset = await MuxVideo.Assets.create({
            input: req.body.inputUrl, // URL del archivo que deseas subir
            playback_policy: visibility === 'public' ? 'public' : 'signed', // Políticas de reproducción
        });

        // Guardar el video en la base de datos
        const video = await Video.create({
            user: req.user.id, // ID del usuario que sube el video
            title,
            description,
            muxAssetId: muxAsset.id, // ID del asset en Mux
            playbackId: muxAsset.playback_ids[0]?.id, // ID de reproducción
            visibility,
        });

        res.status(201).json({ message: 'Video subido correctamente', video });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el video', error: error.message });
    }
});

// Obtener videos públicos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({ visibility: 'public' });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los videos', error: error.message });
    }
});

// Obtener videos del usuario autenticado
router.get('/my-videos', protect, async (req, res) => {
    try {
        const videos = await Video.find({ user: req.user.id });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus videos', error: error.message });
    }
});

module.exports = router;
