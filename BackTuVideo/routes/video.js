const express = require('express');
const { Video } = require('../models/Video');
const { Video: MuxVideo } = new (require('@mux/mux-node'))(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);
const router = express.Router();

// Subir video
router.post('/upload', async (req, res) => {
    try {
        const { title, description, visibility } = req.body;
        const asset = await MuxVideo.Assets.create({ input: req.body.videoUrl, playback_policy: 'public' });

        const newVideo = await Video.create({
            title,
            description,
            visibility,
            user: req.user.id,
            muxAssetId: asset.id,
            playbackId: asset.playback_ids[0].id,
        });

        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).json({ message: 'Error al subir video', error: err.message });
    }
});

// Obtener videos públicos
router.get('/public', async (req, res) => {
    try {
        const videos = await Video.find({ visibility: 'public' });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener videos', error: err.message });
    }
});

module.exports = router;
