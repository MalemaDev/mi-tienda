const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({msg:'No encontrado'});
  res.json(p);
});

module.exports = router;
