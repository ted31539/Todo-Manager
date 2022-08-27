const express = require('express');
const engine = require('ejs-locals');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const todos = require('./routes/todos');

app.use(cors());

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('todoLsit');
});

app.use('/api/todo', todos);
app.use(errorHandler);

const port = process.env.PORT || 3010;

const start = async () => {
  try {   
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log('我在app.js', error);
  }
};

start();
