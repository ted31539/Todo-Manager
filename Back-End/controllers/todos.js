const todoManager = require('../models/todos');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { createCustomError } = require('../errors/customError');

const getAllTodos = asyncWrapper(async (req, res, next) => {
  const todos = await todoManager.getAll();

  res.status(200).json({
    success: true,
    message: '讀取todoList成功',
    data: todos,
  });
});

const getTodo = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const todo = await todoManager.getTodo(id);

  if (!todo) {
    return next(createCustomError('該代辦事項不存在', 404));
  }

  res.status(200).json({
    success: true,
    message: '讀取todo成功',
    data: { id, todo },
  });
});

const createTodo = asyncWrapper(async (req, res, next) => {
  let todo = {
    todo: req.body.todo,
    completed: false,
  };

  if (!todo.todo) {
    return next(createCustomError('新增todo不可沒內容', 412));
  } 

  const todoId = await todoManager.createTodo(todo);
  const newTodo = await todoManager.getTodo(todoId);

  res.status(200).send({
    success: true,
    message: '已新增todo',
    id: todoId,
    data: newTodo,
  });
});

const deleteTodo = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const todo = await todoManager.getTodo(id);

  if (!todo) {
    return next(createCustomError('該代辦事項不存在', 404));
  }

  const isDelete = await todoManager.deleteTodo(id);

  if (isDelete) {
    res.status(200).send({
      success: true,
      message: '已刪除該代辦事項',
      data: todo,
    });
    return;
  }

  if (!isDelete) {
    return next(createCustomError('刪除該代辦事項失敗', 500));
  }
});

const updateTodo = asyncWrapper(async (req, res, next) => {
  const newTodo = req.body;
  const id = req.params.id; 

  const todo = await todoManager.getTodo(id);

  if (!todo) {
    return next(createCustomError('該代辦事項不存在', 404));
  }

  const isUpdate = await todoManager.updateTodo(id, newTodo);

  if (isUpdate) {
    res.send({
      success: true,
      message: '已更新該代辦事項',
      id: id,
      data: newTodo,
    });
    return;
  }

  if (!isUpdate) {
    return next(createCustomError('更新該代辦事項失敗', 500));
  }
});

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
