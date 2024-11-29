const express = require('express');
const Like = require('../models/Like');
const Video = require('../models/Video');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Dar o quitar like a un video
router.post('/:videoId', protect, async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const existingLike = await Like.findOne({ video: videoId, user: userId });

        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1 } });

            return res.status(200).json({ message: 'Like eliminado' });
        }

        await Like.create({ video: videoId, user: userId });
        await Video.findByIdAndUpdate(videoId, { $inc: { likes: 1 } });

        res.status(201).json({ message: 'Like agregado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al procesar el like', error: err.message });
    }
});

// Obtener los likes de un video
router.get('/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Video.findById(videoId);

        if (!video) return res.status(404).json({ message: 'Video no encontrado' });

        res.status(200).json({ likes: video.likes });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener likes', error: err.message });
    }
});

module.exports = router;
