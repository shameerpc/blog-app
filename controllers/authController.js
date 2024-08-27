import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

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
  
  }
}

export default authcontroller