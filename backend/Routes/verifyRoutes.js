import express from  'express'
import db from  '../prismaClient.ts'


const router = express.Router();

router.get('/me',async(req,res)=>{
  const userid = req.userId;

  const user = await db.user.findUnique({
    where:{
      id: userid,
    }
  })

  console.log('hit');
  res.send({user}).status(200);
});

export default router