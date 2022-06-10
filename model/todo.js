const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  description: {
    type: String,
    minLength: 6,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
