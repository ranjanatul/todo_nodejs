const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todoapp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to DB'));

db.once('open', function () {
  console.log('DB connected successfully');
});
