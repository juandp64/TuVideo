import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    setLoading(true); // Activar estado de carga

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Guardar token en localStorage o Context
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir según el rol
      if (user.role === 'admin') {
        navigate('/dashboard'); // Ajustar ruta para admin
      } else {
        navigate('/'); // Ajustar ruta para usuario estándar
      }
    } catch (error) {
      setError('Credenciales inválidas. Por favor intenta nuevamente.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
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
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading} // Deshabilitar el botón mientras se procesa
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'} {/* Mostrar el estado de carga */}
        </button>
      </form>
      <p className="text-center mt-3">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
