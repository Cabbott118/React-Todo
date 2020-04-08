const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

console.log(`App spinning up...`);
