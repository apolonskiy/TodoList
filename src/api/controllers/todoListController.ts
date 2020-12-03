import {
  handleCreateUpdateErrors,
  handleNoIdOrNameSpecified, handleNotExistingTodoId,
  handleNoTodoIdSpecified,
} from '../error-handlers/controllerErrorHandlers';

const dbClient = require('../../db-client-utils/db-client');

export const getAllTodoLists = async () => {
  try {
    const res = await dbClient.query('SELECT * FROM tdl.todo_list');
    return res.rows;
  } catch (e) {
    throw e;
  }
};

export const createTodoList = async (todoName: string) => {
  if (!todoName) {
    throw new Error(handleNoTodoIdSpecified());
  }
  try {
    const res = await dbClient
        .query(`INSERT INTO tdl.todo_list (todo_name) VALUES ('${
          todoName
        }') RETURNING todo_list_id,todo_name`);
    return res.rows[0];
  } catch (e) {
    handleCreateUpdateErrors(e.stack, [todoName]);
    throw e;
  }
};

export const updateTodoList = async (todoId: string, newTodoName: string) => {
  if (!(newTodoName && todoId)) {
    throw new Error(handleNoIdOrNameSpecified());
  }
  try {
    const res = await dbClient
        .query(`UPDATE tdl.todo_list SET todo_name='${
          newTodoName
        }' WHERE todo_list_id='${
          todoId
        }' RETURNING todo_name, todo_list_id`);
    if (!res.rowCount) {
      throw new Error(handleNotExistingTodoId(todoId));
    }
    return res.rows[0];
  } catch (e) {
    handleCreateUpdateErrors(e.stack, [newTodoName, todoId]);
    throw e;
  }
};

export const getTodoList = async (todoId: string) =>{
  if (!todoId) {
    throw new Error(handleNoTodoIdSpecified());
  }
  try {
    const res = await dbClient
        .query(`SELECT * FROM tdl.todo_list WHERE todo_list_id='${todoId}'`);
    return res.rows[0];
  } catch (e) {
    throw e;
  }
};

export const deleteTodoList = async (todoIds: string[]) =>{
  if (todoIds.length < 1) {
    throw new Error(handleNoTodoIdSpecified());
  }
  try {
    const res = await dbClient
        .query(`DELETE FROM tdl.todo_list WHERE todo_list_id IN (${
          todoIds.map((v) => `'${v}'`).join(',')})`);
    return res.rowCount;
  } catch (e) {
    throw e;
  }
};
