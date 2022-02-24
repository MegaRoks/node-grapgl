const express = require('express');

const app = express();

const todoRouters = require('./routes/todo');

app.use(express.json());
app.use('/api/todo', todoRouters);

async function start() {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();