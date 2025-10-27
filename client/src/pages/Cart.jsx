import React, { useState, useEffect } from 'react';
import API from '../api';
import '../index.css';

export default function Cart() {
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/purchases/my');
        setMyPurchases(res.data);
      } catch (e) {
        console.error('Error al cargar compras:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>🛒 Mis Compras</h2>

        {loading ? (
          <p>Cargando compras...</p>
        ) : myPurchases.length === 0 ? (
          <p>Aún no has realizado ninguna compra.</p>
        ) : (
          <ul>
            {myPurchases.map((p) => (
              <li
                key={p._id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <strong>Compra:</strong> {new Date(p.createdAt).toLocaleString()} <br />
                <strong>Total:</strong> ${p.total.toFixed(2)} <br />
                <strong>Items:</strong> {p.items.length}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
