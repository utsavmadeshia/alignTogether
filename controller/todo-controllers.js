
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const HttpError = require('../models/http-error');
// const Todo = require('../models/todos');
// const User = require('../models/users');
import HttpError from '../models/http-error.js';
import Todo from '../models/todos.js';
import User from '../models/users.js';
const getTodoByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithTodos;
  try {
    userWithTodos = await User.findById(userId).populate('todos');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithTodos || userWithTodos.todos.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    todos: userWithTodos.todos.map(todo =>
      todo.toObject({ getters: true })
    )
  });
};

const createTodo = async (req, res, next) => {
  const { title, description} = req.body;

  const createdTodo = new Todo({
    title,
    description,
    creator: req.userData.userId
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTodo.save({ session: sess });
    user.todos.push(createdTodo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};


const deleteTodo = async (req, res, next) => {
  const todoId = req.params.pid;

  let todo;
  try {
    todo = await Todo.findById(todoId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await todo.remove({ session: sess });
    todo.creator.places.pull(todo);
    await todo.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};

// exports.getTodoByUserId = getTodoByUserId;
// exports.createTodo = createTodo;
// exports.deleteTodo = deleteTodo;
export default {getTodoByUserId,createTodo,deleteTodo}
