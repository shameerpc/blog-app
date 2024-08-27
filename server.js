import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js';
import 'dotenv/config'


const app=express();

connectDB()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api',authRoutes)


const PORT= process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
