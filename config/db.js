import mongoose from "mongoose";
import 'dotenv/config'

const connectDB=()=>{
   mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{console.log("mongodb connected successfully")})
  .catch(err=>{console.error('mongodb connection failed',err)}) 
}

  export default connectDB;

