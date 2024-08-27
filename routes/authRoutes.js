import express from "express";
const routes=express.Router()


routes.post('/register',(req,res)=>{
    res.send("hi")
})


export default routes;

