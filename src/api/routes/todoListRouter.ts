import { TodoListController } from '../controllers/todoListController';
import { Request, Response } from 'express';

import { client as dbClient } from '../../db-client-utils/db-client';

import * as express from 'express';

const todoListController = new TodoListController(dbClient);
export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await todoListController.getAllTodoLists();
    res.status(200);
    res.json(response);
    res.end();
  } catch (e) {
    res.status(404);
    res.json({ errors: [{ message: e.message }] });
  }
});

router.get('/:todoId', async (req: Request, res: Response) => {
  try {
    const response = await todoListController.getTodoList(req.params.todoId);
    res.status(200);
    res.json(response);
    res.end();
  } catch (e) {
    res.status(404).json({ errors: [{ message: e.message }] });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.todoName) {
      res.status(400).json({
        errors: [{ message: 'Bad request. todoName must be specified.' }]
      });
      return res.end();
    }
    const response = await todoListController.createTodoList(req.body.todoName);
    res.status(201);
    res.json(response);
    res.end();
  } catch (e) {
    res.status(409).json({ errors: [{ message: e.message }] });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const response = await todoListController.deleteTodoList(req.body.todoIds);
    res.status(200);
    res.json(
      "You've successfully removed " +
        response +
        (response > 1 ? ' TODOs.' : ' TODO.')
    );
    res.end();
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const response = await todoListController.updateTodoList(
      req.body.todoId,
      req.body.newTodoName
    );
    res.status(200);
    res.json(response);
    res.end();
  } catch (e) {
    res.status(400).json({ errors: [{ message: e.message }] });
  }
});
