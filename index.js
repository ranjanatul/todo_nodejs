const express = require('express');
const port = 9000;
const app = express();

// const bodyParser = require('body-parser');
app.use(express.urlencoded());
app.use(express.json());

const db = require('./config/mongoose');
const TodoModel = require('./model/todo');

app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  TodoModel.find({}, function (err, todolist) {
    if (err) {
      console.error(err);
      return res.send('Something went wrong!');
    }
    return res.render('todo', {
      todoList: todolist,
    });
  });
});

app.post('/add', (req, res) => {
  TodoModel.create({ ...req.body })
    .then((response) => {
      console.log(response);
      return res.status(200).send('Deleted successfully!');
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Isuue!');
    });
});

app.delete('/delete', (req, res) => {
  TodoModel.deleteMany({ ...req.body })
    .then((response) => {
      console.log(response);
      return res.status(200).send('Deleted successfully!');
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Isuue!');
    });
});

app.listen(port, function (err) {
  if (err) {
    console.error('ERROR: ', err);
    return;
  }
  console.log('Server is up and running');
});
