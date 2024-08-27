import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js';


const PORT='3000'
const app=express();

connectDB()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api',authRoutes)




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
