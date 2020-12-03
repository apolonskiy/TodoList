import {
  getAllTodoLists, getTodoList, createTodoList,
  deleteTodoList, updateTodoList,
} from '../controllers/todoListController';
import {Request, Response} from 'express';

import express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await getAllTodoLists();
    res.status(200);
    res.json({data: response});
    res.end();
  } catch (e) {
    res.status(404);
    res.json({error: e.message});
  }
});

router.get('/:todoId', async (req: Request, res: Response) => {
  try {
    const response = await getTodoList(req.params.todoId);
    res.status(200);
    res.json({data: response});
    res.end();
  } catch (e) {
    res.status(404).json({error: e.message});
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.todoName) {
    res.status(400).json({error: 'Bad request. todoName must be specified.'});
  }
  try {
    const response = await createTodoList(req.body.todoName);
    res.status(201);
    res.json({data: response});
    res.end();
  } catch (e) {
    res.status(409).json({error: e.message});
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const response = await deleteTodoList(req.body.todoIds);
    res.status(200);
    res.json({data: 'You\'ve successfully removed '+ response +
          (response > 1 ? ' TODOs.' : ' TODO.')});
    res.end();
  } catch (e) {
    res.status(400).json({error: e.message});
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const response = await updateTodoList(
        req.body.todoId,
        req.body.newTodoName,
    );
    res.status(200);
    res.json({data: response});
    res.end();
  } catch (e) {
    res.status(400).json({error: e.message});
  }
});

module.exports = router;
