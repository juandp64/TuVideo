const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
