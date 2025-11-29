import express from "express";

const router = express.Router();

router.post('/register',(req,res)=>{
  const {email,password} = req.body;

  res.send('right');

  console.log('register a user');
})

export default router;