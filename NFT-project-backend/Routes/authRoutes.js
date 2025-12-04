import express from "express";
import db from "../prismaClient.ts";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'


const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (
    await db.User.findUnique({
      where: {
        email
      }
    })
  ) {
    return res.send('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(password, 4);


  await db.User.create({
    data: {
      email,
      password: hashedPassword
    }
  })


  res.status(201).send('Register a user');

})

router.post('/login', async (req,res) =>{
  const {email, password } = req.body;
  


  const user = await db.User.findUnique({
    where: {
      email
    }
  })

  if(!user){
    return res.sendStatus(404);
  }

  const passwordIsValid = bcrypt.compareSync(password,user.password);


  if(!passwordIsValid){
    return res.sendStatus(401);
  }

  return res.send('Logging in was succesful').status(204);
})

export default router;