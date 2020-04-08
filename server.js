const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = process.env.MONGODB;
mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api/todos', require('./routes/api/todos'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

console.log(`App spinning up...`);
