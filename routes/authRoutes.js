import express from "express";
const routes=express.Router()
import { body, validationResult } from 'express-validator';
import authcontroller from "../controllers/authController.js";

routes.post('/register',  [
    body('username')
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },authcontroller.register)

  routes.post('/login',authcontroller.login)


export default routes;

