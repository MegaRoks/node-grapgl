const {Router} = require('express')
const router = Router()

const todosData = new Map([
  [1,
    {
      title: 'Create App',
      done: false,
    }],
]);


// Получение списка задач
router.get('/', (req, res) => {
  try {
    console.log('get list');

    const todos = [];

    for (let [key, value] of todosData.entries()) {
      todos.push({ id: key, ...value });
    }

    console.log(todos);

    res.status(200).json({
      message: 'Todos list',
      todos,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
    });
  }
})

// Получение диталей задачи
router.get('/:id', (req, res) => {
  try {
    console.log('get details');

    const todoId = Number(req.params.id);

    if(todosData.has(todoId)) {
      const todoData =  todosData.get(todoId);

      const todo = {
        id: todoId,
        title: todoData.title,
        done: todoData.done,
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// Создание новой задачи
router.post('/',  (req, res) => {
  try {
    console.log('create');
    const {id, title, done} = req.body;
    todosData.set(id, { title, done });

    const todo = { id, title, done };

    console.log(todo);

    res.status(200).json({
      message: 'Todo created',
      todo,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// Изменение задачи
router.put('/:id', (req, res) => {
  try {
    console.log('update');

    const todoId = Number(req.params.id);

    if(todosData.has(todoId)) {
      const { title, done } = req.body;
      const todo = { id: todoId, title, done };

      todosData.set(todoId, { title, done });

      res.status(200).json({
        message: 'Todo updated',
        todo,
      });
    } else {
      res.status(200).json({
        message: `Todo with id ${todoId} not found`,
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// Удаление задачи
router.delete('/:id', (req, res) => {
  try {
    console.log('delete')

    const todoId = Number(req.params.id);

    if(todosData.has(todoId)) {
      todosData.delete(todoId);

      res.status(200).json({
        message: 'Todo deleted',
      });
    } else {
      res.status(200).json({
        message: `Todo with id ${todoId} not found`,
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;