const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

// @route  GET api/todos
// @desc   Get All Todos
// @access Public
router.get('/', (req, res) => {
  // Get todos and sort
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

// @route  DELETE api/todos
// @desc   Delete A Todo
// @access Public
router.delete('/:id', (req, res) => {
  // Find todo to delete by ID
  Todo.findById(req.params.id)
    // Remove todo from DB
    .then((todo) =>
      todo
        .remove()
        // Send Success message if success || Not Found if failed
        .then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
