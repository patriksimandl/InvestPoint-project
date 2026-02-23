import express from "express";
import db from "../prismaClient.ts";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'


function assignWebToken(user){
  const token = jwt.sign({id: user.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
  return token
}


const router = express.Router();

router.post('/register', async (req, res) => {

  const todaysDate = dayjs().format('YYYY-MM-DD');
  


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
    var createdUser = await db.User.findUnique({
      where: {
        email
      }
    })

    //create porfolio
    await db.userPortfolio.create({
      data: {
        userId: createdUser.id,
        totalBalanceHistory: [{ date: todaysDate, value: 1000 }],
        cashBalanceHistory: [{date: todaysDate ,value: 1000}]
        
      }
    })

  }catch (err) {
    console.log(err.message);
  }

  const userEmail = createdUser.email;

  const token = assignWebToken(createdUser);



  res.cookie("accessToken",token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 1000 * 60* 20
  })


  return res.json({message : 'Register a user',email: userEmail}).status(204);

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;



  const user = await db.User.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return res.status(401).send({ message: 'User not found' ,});
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);


  if (!passwordIsValid) {
    return res.status(401).send({message: 'Invalid password'});
  }

  const token = assignWebToken(user);

  const userEmail = user.email
  
  //save the token in Http-only cookie
  res.cookie("accessToken",token, {
    //Client site js cannot read the cookies => document.cookies
    httpOnly: true,
    //if it is sent even on HTTP or just on HTTPS
    //in production set it on
    //using false just for localhost development
    secure: false,

    //How the cookie will be realive
    //if the sites are requested each from backend strict wont work
    //if it navige from client site from frontend => like react router 'strict' setting will work and it is most secured
    sameSite: 'strict',
    path: '/',
    //how long the cookie will be in the browser
    maxAge: 1000 * 60* 20
  });

  return res.json({message : 'Logging was succesful',email:userEmail}).status(204);
})

router.post('/logout', (req,res)=>{

  res.clearCookie("accessToken",{
    
    httpOnly: true,
    //In production has to be true because development is htttp and it is not secure
    secure: false,
    sameSite: 'strict',
    path: "/",
  })

  return res.status(200).send('succesfully logged out');
})

export default router;

