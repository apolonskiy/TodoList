import {
  handleCreateUpdateErrors,
  handleNoIdOrNameSpecified,
  handleNotExistingTodoId,
  handleNoTodNameSpecified,
  handleNoTodoIdSpecified
} from '../error-handlers/controllerErrorHandlers';

export interface ITodo {
  todo_list_id: string;
  todo_name: string;
}

export class TodoListController {
  private dbClient: any;

  constructor(dbClient: any) {
    this.dbClient = dbClient;
  }

  async getAllTodoLists(pagination = 10): Promise<ITodo[]> {
    try {
      const res = await this.dbClient.query(
        `SELECT * FROM tdl.todo_list LIMIT ${pagination}`
      );
      return res.rows;
    } catch (e) {
      throw e;
    }
  }

  async createTodoList(todoName: string): Promise<ITodo> {
    try {
      const res = await this.dbClient.query(
        `INSERT INTO tdl.todo_list (todo_name) VALUES ('${todoName.trim()}') RETURNING todo_list_id,todo_name`
      );
      return res.rows[0];
    } catch (e) {
      handleCreateUpdateErrors(e.stack, [todoName]);
      throw e;
    }
  }

  async updateTodoList(todoId: string, newTodoName: string): Promise<ITodo> {
    if (!(newTodoName && todoId)) {
      throw new Error(handleNoIdOrNameSpecified());
    }
    try {
      const res = await this.dbClient.query(
        `UPDATE tdl.todo_list SET todo_name='${newTodoName}' WHERE todo_list_id='${todoId}' RETURNING todo_name, todo_list_id`
      );
      if (!res.rowCount) {
        throw new Error(handleNotExistingTodoId(todoId));
      }
      return res.rows[0];
    } catch (e) {
      handleCreateUpdateErrors(e.stack, [newTodoName, todoId]);
      throw e;
    }
  }

  async getTodoList(todoId: string): Promise<ITodo> {
    if (!todoId) {
      throw new Error(handleNoTodoIdSpecified());
    }
    try {
      const res = await this.dbClient.query(
        `SELECT * FROM tdl.todo_list WHERE todo_list_id='${todoId}'`
      );
      if (!res.rows.length) {
        throw new Error('No TodoList Found.');
      }
      return res.rows[0];
    } catch (e) {
      handleCreateUpdateErrors(e.stack, ['', todoId]);
      throw e;
    }
  }

  async deleteTodoList(todoIds: string[]): Promise<number> {
    if (todoIds.length < 1) {
      throw new Error(handleNoTodoIdSpecified());
    }
    try {
      const res = await this.dbClient.query(
        `DELETE FROM tdl.todo_list WHERE todo_list_id IN (${todoIds
          .map(v => `'${v}'`)
          .join(',')})`
      );
      return res.rowCount;
    } catch (e) {
      throw e;
    }
  }
}
