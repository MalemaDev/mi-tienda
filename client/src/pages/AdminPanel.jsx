import React, { useEffect, useState } from 'react';
import API from '../api';
import '../index.css'; // asegúrate de tener tus estilos globales

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [top, setTop] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, stock: 0 });

  // Cargar productos al montar el componente
  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (error) {
      alert('Error al cargar productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Agregar nuevo producto
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/product', form);
      alert('Producto agregado ✅');
      setForm({ name: '', description: '', price: 0, stock: 0 });
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.msg || 'Error al agregar producto');
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await API.delete(`/admin/product/${id}`);
        alert('Producto eliminado');
        fetchProducts();
      } catch (error) {
        alert('Error al eliminar producto');
      }
    }
  };

  // Cargar top vendidos
  const loadTop = async () => {
    try {
      const res = await API.get('/admin/top-sold');
      setTop(res.data);
    } catch (error) {
      alert('Error al cargar top vendidos');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Panel de administración 🛠️</h2>

        <h3>Agregar nuevo producto</h3>
        <form onSubmit={addProduct} style={{ width: '100%' }}>
          <input
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            required
          />
          <button type="submit">Agregar producto</button>
        </form>
      </div>

      <div className="card">
        <h3>Lista de productos 📦</h3>
        {products.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p._id} style={{ marginBottom: '10px' }}>
                <strong>{p.name}</strong> — ${p.price} — Stock: {p.stock}
                <button
                  style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}
                  onClick={() => deleteProduct(p._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Top productos vendidos 🏆</h3>
        <button onClick={loadTop}>Cargar top vendidos</button>
        {top.length > 0 && (
          <ol style={{ marginTop: '10px' }}>
            {top.map((p) => (
              <li key={p._id}>
                {p.name} — vendidos: {p.sold}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
