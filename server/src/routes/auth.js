const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  try{
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ msg:'Email ya registrado' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id:user._id, name:user.name, email:user.email, role:user.role } });
  }catch(e){ console.error(e); res.status(500).json({ msg:'Error servidor' }); }
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg:'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ msg:'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id:user._id, name:user.name, email:user.email, role:user.role } });
  }catch(e){ console.error(e); res.status(500).json({ msg:'Error servidor' }); }
});

module.exports = router;
