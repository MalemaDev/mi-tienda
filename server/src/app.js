require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const purchaseRoutes = require('./routes/purchases');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/admin', adminRoutes);

const start = async ()=>{
  await mongoose.connect(process.env.MONGODB_URI);
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log('Server running', port));
}

if(require.main === module) start();

module.exports = app;
