import express from "express";
const routes=express.Router()
import { body, validationResult } from 'express-validator';
import blogcontroller from "../controllers/blogController.js";
import auth from '../middlewares/autherization.js'

routes.post('/',auth,blogcontroller.createBlog)
routes.post('/:id',auth,blogcontroller.updateBlog)
routes.delete('/:id',auth,blogcontroller.deleteBlog)

export default routes;