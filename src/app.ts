import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { client as dbClient } from './db-client-utils/db-client';
import * as fs from 'fs';

import { router as todoListRouter } from './api/routes/todoListRouter';
const port = process.env.PORT || 3002;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true }));

app.use('/tasks', todoListRouter);

const sql = fs.readFileSync('./migrations/001.todo-list.sql').toString();

dbClient.query(sql);

app.listen(port);

console.log('todo list REST API src started on: ' + port);
