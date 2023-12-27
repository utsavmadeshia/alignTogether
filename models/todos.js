// const mongoose = require('mongoose');

import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default  mongoose.model('Todo', todoSchema);
