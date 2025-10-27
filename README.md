Proyecto generado: Sistema de Ventas (React + Express + MongoDB Atlas)

Estructura principal:
- server/: backend preparado para Vercel serverless (api/index.js).
- client/: frontend Vite + React.

Instrucciones rápidas:
1) Backend:
   - Copia .env.example a .env y configura MONGODB_URI y JWT_SECRET.
   - Instala dependencias: cd server && npm install
   - Para correr local: npm run dev (necesitas MongoDB Atlas string)
   - Para deploy en Vercel: crea proyecto apuntando a la carpeta 'server'. Añade variables de entorno en Vercel (MONGODB_URI, JWT_SECRET).

2) Frontend:
   - cd client && npm install
   - Define VITE_API_URL en .env.local (por ejemplo VITE_API_URL=https://tu-backend.vercel.app)
   - npm run dev para desarrollo, npm run build para producción.
   - Deploy en Vercel: crea proyecto apuntando a la carpeta 'client'. Configura variable VITE_API_URL a la URL del backend.

Notas:
- El frontend usa polling cada 2s para actualizar el stock.
- No hay pasarela de pago; la compra se simula con un endpoint que actualiza stock y guarda la compra.
