const Mux = require('@mux/mux-node');

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;

// Inicializar cliente de Mux
const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

module.exports = Video;
