import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';  // Importamos la instancia de axios

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    setSuccessMessage(''); // Limpiar mensaje de éxito previo

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      // Mostrar mensaje de éxito
      setSuccessMessage('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar el usuario. Intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registrarse</h2>
      
      {/* Mostrar mensaje de éxito */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {/* Mostrar error si lo hay */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrar</button>
      </form>

      <p className="text-center mt-3">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;
