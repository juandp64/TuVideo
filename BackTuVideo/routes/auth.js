const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Importamos bcryptjs
const User = require('../models/User');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario con la contraseña encriptada
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Verificar que el usuario existe y que la contraseña es correcta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    }
});

module.exports = router;
