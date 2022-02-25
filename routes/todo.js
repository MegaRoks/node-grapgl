const { Router } = require('express');
const { todos } = require('../database/database');

const router = Router();

// Получение списка задач
router.get('/', (req, res) => {
  console.log('get todos list');

  const todosList = [];

  for (let [key, value] of todos.entries()) {
    todosList.push({ id: key, ...value });
  }

  res.status(200).json({
    message: 'Todos list',
    todos: todosList,
  });
})

// Получение диталей задачи
router.get('/:id', (req, res) => {
  console.log('get todo details');

  const todoId = Number(req.params.id);

  if(todos.has(todoId)) {
    const fundTodo = todos.get(todoId);

    const todo = {
      id: todoId,
      title: fundTodo.title,
      done: fundTodo.done,
    };

    res.status(200).json({
      message: 'Todo details',
      todo,
    });
  } else {
    res.status(200).json({
      message: `Todo with id ${todoId} not found`,
    });
  }
});

// Создание новой задачи
router.post('/',  (req, res) => {
  console.log('todo create');

  const {id, title, done} = req.body;
  todos.set(id, { title, done });

  const todo = { id, title, done };

  res.status(200).json({
    message: 'Todo created',
    todo,
  });
});

// Изменение задачи
router.put('/:id', (req, res) => {
  console.log('todo update');

  const todoId = Number(req.params.id);

  if(todos.has(todoId)) {
    const { title, done } = req.body;
    const todo = { id: todoId, title, done };

    todos.set(todoId, { title, done });

    res.status(200).json({
      message: 'Todo updated',
      todo,
    });
  } else {
    res.status(200).json({
      message: `Todo with id ${todoId} not found`,
    });
  }
});

// Удаление задачи
router.delete('/:id', (req, res) => {
  console.log('todo delete');

  const todoId = Number(req.params.id);

  if(todos.has(todoId)) {
    todos.delete(todoId);

    res.status(200).json({
      message: 'Todo deleted',
    });
  } else {
    res.status(200).json({
      message: `Todo with id ${todoId} not found`,
    });
  }
});

module.exports = router;