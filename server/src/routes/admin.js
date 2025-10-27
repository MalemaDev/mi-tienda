const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, adminOnly } = require('../utils/authMiddleware');

router.post('/product', auth, adminOnly, async (req,res)=>{
  const { name, description, price, stock } = req.body;
  const p = new Product({ name, description, price, stock });
  await p.save();
  res.json(p);
});

router.delete('/product/:id', auth, adminOnly, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg:'Eliminado' });
});

router.get('/top-sold', auth, adminOnly, async (req,res)=>{
  const top = await Product.find().sort({ sold: -1 }).limit(10);
  res.json(top);
});

module.exports = router;
