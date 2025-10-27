import React, { useEffect, useState } from 'react';
import API from '../api';
import '../index.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      try {
        const res = await API.get('/products');
        if (mounted) setProducts(res.data);
      } catch (e) {
        console.error('Error al cargar productos:', e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
    const id = setInterval(fetch, 2000); // actualización cada 2s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const add = (p) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.product === p._id);
      if (existing)
        return prev.map((x) =>
          x.product === p._id ? { ...x, qty: x.qty + 1 } : x
        );
      return [...prev, { product: p._id, name: p.name, qty: 1, price: p.price }];
    });
  };

  const buy = async () => {
    try {
      await API.post('/purchases', {
        items: cart.map((c) => ({ product: c.product, qty: c.qty })),
      });
      alert('✅ Compra completada exitosamente');
      setCart([]);
    } catch (e) {
      alert(e.response?.data?.msg || 'Error al procesar la compra');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🛍️ Productos disponibles</h2>

        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length === 0 ? (
          <p>No hay productos disponibles actualmente.</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p><strong>💲Precio:</strong> ${p.price}</p>
                <p><strong>📦 Stock:</strong> {p.stock}</p>
                <button
                  onClick={() => add(p)}
                  disabled={p.stock <= 0}
                  className="btn"
                >
                  {p.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
              </div>
            ))}
          </div>
        )}

        <h3 style={{ marginTop: '30px' }}>🧺 Carrito</h3>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul>
              {cart.map((c) => (
                <li key={c.product}>
                  {c.name} × {c.qty} — ${c.price * c.qty}
                </li>
              ))}
            </ul>

            <p style={{ marginTop: '10px' }}>
              <strong>
                Total: $
                {cart.reduce((acc, c) => acc + c.price * c.qty, 0).toFixed(2)}
              </strong>
            </p>

            <button
              onClick={buy}
              className="btn"
              style={{ marginTop: '10px' }}
              disabled={cart.length === 0}
            >
              Confirmar compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}
