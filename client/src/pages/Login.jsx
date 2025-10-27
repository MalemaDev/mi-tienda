import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // asegúrate de importar tus estilos globales

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); // evita recargar la página
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Inicio de sesión exitoso ✅');
      nav('/'); // redirige al inicio o dashboard
    } catch (e) {
      alert(e.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={submit}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿No tienes cuenta?{' '}
          <span
            style={{ color: '#007bff', cursor: 'pointer' }}
            onClick={() => nav('/register')}
          >
            Regístrate
          </span>
        </p>
      </form>
    </div>
  );
}
