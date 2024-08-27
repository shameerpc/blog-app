import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import 'dotenv/config'

const saltRounds = 10;

const authcontroller={
    register : async(req,res)=>{
        console.log(req.body);
      try {
          
      const {username,email,password} = req.body;
  
      const user=await User.findOne({email:email});
  
      if(user){
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const data=new User({
          username:username,
          email:email,
          password:hashedPassword
      })
      const result=await data.save()
      console.log(data)
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: result._id,
          name: result.username,
          email: result.email,
          createdAt: result.createdAt,
        },
      });
  } catch (error) {
      console.log(error)
          return res.status(503).json(error);
  }
  
  },
  login:async(req,res)=>{
    try {

    const {email,password} =req.body;
    if(!email||!password){
        res.status(401).json({ msg: 'credentials are required' })
    }
    const user=await User.findOne({email})
         
   if(!user){
    res.status(401).json({ msg: 'no user found' })
   }
         const checkPass=await bcrypt.compare(password, user.password);
    if(checkPass==false){
        res.status(401).json({msg:'password is not correct'})
    }
    const token=jwt.sign({
        data: user.id
      }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    res.status(200).json({
        success: true,
        message: 'User login successfully',
        result: {
            token: token
        },
      })
} catch (error) {
        console.log(error)
        res.status(500).json(error)
}
     
},
}

export default authcontroller