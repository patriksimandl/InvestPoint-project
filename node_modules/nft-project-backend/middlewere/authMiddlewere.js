import jwt from 'jsonwebtoken'

export function authMiddlewere(req,res,next){
  const token = req.cookies?.accessToken;

  if(!token){
    return res.status(401).json({message: 'No token provided'});
  }


  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded) =>{
    if(err){
      return res.status(401).json({message: 'Invalid token'});
    }
    req.userId = decoded.id;
    next();
  })
}

export default authMiddlewere;