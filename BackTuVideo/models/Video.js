const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
        title: { type: String, required: true, },
        description: { type: String, },
        muxAssetId: { type: String, required: true, },
        playbackId: { type: String, required: true, },
        visibility: { type: String, enum: ['public', 'private'], default: 'private', },
        likes: { type: Number, default: 0, },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
