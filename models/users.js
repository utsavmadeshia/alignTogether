// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Todo' }]
});

// userSchema.plugin(uniqueValidator);

export default  mongoose.model('User', userSchema);
