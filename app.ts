const port = process.env.PORT || 3002;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbClient = require('./src/db-client-utils/db-client.ts');
const fs = require('fs');

const todoListRouter = require('./src/api/routes/todoListRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', todoListRouter);

const sql = fs.readFileSync('./migrations/001.todo-list.sql').toString();

dbClient.query(sql);

app.listen(port);

console.log('todo list REST API server started on: ' + port);
