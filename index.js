const express = require('express');

const todoRouters = require('./routes/todo');

const app = express();

app.use(express.json());
app.use('/api/todo', todoRouters);

async function start() {
  const PORT = 3001;

  app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });
}
start();