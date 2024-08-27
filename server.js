import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const PORT='3000'
const app=express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
