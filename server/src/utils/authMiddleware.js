  const jwt = require('jsonwebtoken');
  const User = require('../models/User');

  const auth = async (req,res,next)=>{
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({msg:'No token'});
    const token = header.split(' ')[1];
    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload.id).select('-password');
      next();
    }catch(e){
      return res.status(401).json({msg:'Token inválido'});
    }
  }

  const adminOnly = (req,res,next)=>{
    if(!req.user) return res.status(401).json({msg:'No autorizado'});
    if(req.user.role !== 'IsAdmin') return res.status(403).json({msg:'Se necesita rol admin'});
    next();
  }

  module.exports = { auth, adminOnly };
