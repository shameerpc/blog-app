import jwt from 'jsonwebtoken';
import 'dotenv/config'

const auth=(req,res,next)=>{
     const authhead=req.headers.authorization
     if(!authhead){
        res.status(401).json({msg:'Token is required'});
     }
     const token = authhead.split(' ')[1];
     if (!token) {
       return res.status(401).json({msg:'Token is missing'});
     }

     jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
      if (err) {
         return res.status(401).json({msg:'Invalid token'});
       }
       req.user = decoded; 
       next(); 

    });

        
}

export default auth