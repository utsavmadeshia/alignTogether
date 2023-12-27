// const express = require('express');
import express from "express"

// const todoControllers = require('../controller/todo-controllers');
// const checkAuth = require('../middleware/check-auth');
import todoControllers from "../controller/todo-controllers.js";
import checkAuth from '../middleware/check-auth.js'
const router = express.Router();


router.get('/user/:uid', todoControllers.getTodoByUserId);

router.use(checkAuth);

router.post('/', todoControllers.createTodo);


router.delete('/:pid', todoControllers.deleteTodo);

export default router;
