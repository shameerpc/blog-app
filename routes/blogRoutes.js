import express from "express";
const routes=express.Router()
import { body, validationResult } from 'express-validator';
import blogcontroller from "../controllers/blogController.js";
import auth from '../middlewares/autherization.js'

routes.post('/blog',auth,blogcontroller.createBlog)



export default routes;