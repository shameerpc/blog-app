import express from "express";
const routes=express.Router()
import { check } from 'express-validator';
import blogcontroller from "../controllers/blogController.js";
import auth from '../middlewares/autherization.js'

routes.post('/',  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
  ],blogcontroller.createBlog)
routes.post('/:id',auth,blogcontroller.updateBlog)
routes.delete('/:id',auth,blogcontroller.deleteBlog)
routes.get('/',auth,blogcontroller.getAllBlog)

export default routes;