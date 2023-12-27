// const express = require('express');
import express from "express"

// const { check } = require('express-validator');
import { check } from "express-validator";
// const usersController = require('../controller/userController');
import usersController from '../controller/userController.js';

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

export default router;
