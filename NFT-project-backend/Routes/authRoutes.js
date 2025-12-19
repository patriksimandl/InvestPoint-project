import express from "express";
import db from "../prismaClient.ts";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'


const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {

    if (
      await db.User.findUnique({
        where: {
          email
        }
      })
    ) {
      return res.status(304).send('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 4);


    await db.User.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    //get the created user
    const createdUser = await db.User.findUnique({
      where: {
        email
      }
    })

    console.log(createdUser.id);
    //create porfolio
    await db.userPortfolio.create({
      data: {
        userId: createdUser.id,
        totalBalanceHistoryInUSD: { today: 0 }
      }
    })

  }catch (err) {
    console.log(err.message);
  }


  res.status(201).send('Register a user');

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;



  const user = await db.User.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return res.send({ message: 'User not found' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);


  if (!passwordIsValid) {
    return res.sendStatus(401);
  }

  return res.send('Logging in was succesful').status(204);
})

export default router;