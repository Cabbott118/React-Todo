const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

// @route  GET api/todos
// @desc   Get All Todos
// @access Public
router.get('/', (req, res) => {
  // Get items and sort
  Todo.find()
    .sort({ date: -1 })
    .then((todos) => res.json(todos));
});

// @route  POST api/todos
// @desc   Create An Todos
// @access Public
router.post('/', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    date: req.body.date,
  });
  newTodo.save().then((todo) => res.json(todo));
});

module.exports = router;
