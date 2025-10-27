const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const { auth } = require('../utils/authMiddleware');

router.post('/', auth, async (req,res)=>{
  const { items } = req.body; // [{product: id, qty}]
  try{
    let total = 0;
    const purchaseItems = [];
    for(const it of items){
      const prod = await Product.findById(it.product);
      if(!prod) return res.status(400).json({msg:'Producto no encontrado'});
      if(prod.stock < it.qty) return res.status(400).json({msg:`Stock insuficiente para ${prod.name}`});
      total += prod.price * it.qty;
      purchaseItems.push({ product: prod._id, qty: it.qty, priceAtPurchase: prod.price });
    }

    const p = new Purchase({ user: req.user._id, items: purchaseItems, total });
    await p.save();

    for(const it of items){
      await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty, sold: it.qty } });
    }

    res.json({ msg:'Compra completada' });
  }catch(e){ console.error(e); res.status(500).json({msg:'Error servidor'}); }
});

router.get('/my', auth, async (req,res)=>{
  const list = await Purchase.find({ user: req.user._id }).populate('items.product');
  res.json(list);
});

module.exports = router;
