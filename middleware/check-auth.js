// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken"
// const HttpError = require('../models/http-error');
import HttpError  from '../models/http-error.js';

export default  function(req, res, next){
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
