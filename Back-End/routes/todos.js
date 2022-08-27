const express = require('express');
const router = express.Router();

const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos');
const jsonParser = express.json();

router.route('/').get(getAllTodos).post(jsonParser, createTodo);
router
  .route('/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(jsonParser, updateTodo);

module.exports = router;
