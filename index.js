const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/root');
const app = express();

const todoRouters = require('./routes/todo');

app.use(express.json());
app.use('/api/todo', todoRouters);
app.use('/graphql',graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

async function start() {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();