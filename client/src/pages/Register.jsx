import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('✅ Registro exitoso');
      nav('/');
    } catch (e) {
      alert(e.response?.data?.msg || 'Error al registrar usuario');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={submit}>
        <h2>📝 Registro de usuario</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          minLength={6}
        />

        <button type="submit">Registrar</button>

        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿Ya tienes una cuenta?{' '}
          <span
            style={{ color: '#007bff', cursor: 'pointer' }}
            onClick={() => nav('/login')}
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}
