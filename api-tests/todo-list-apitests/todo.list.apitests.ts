import { ITodo, TodoListApi } from './todo-list.api';
import { cleanDb, randomUuid } from '../utils/utils';
import { ErrorResponse } from '../utils/axios-utils';
import { AxiosResponse } from 'axios';
describe('TodoList API tests', () => {
  describe('POST: /tasks - Create TodoList', () => {
    beforeEach(async () => {
      await cleanDb();
    });
    it('Can create basic TodoList incl special chars in name', async () => {
      const todoListName = '!@#$%^&* todo name';
      const resp = await TodoListApi.createTodoList(todoListName);
      const respData = resp.data as ITodo;
      expect(resp.status).toEqual(201);
      expect(respData.todo_name).toEqual(todoListName);
    });

    it('Can not create TodoList with too long name', async () => {
      const todoListName = 'x'.repeat(26);
      const resp = await TodoListApi.createTodoList(todoListName);
      const respData = resp.data as ErrorResponse;
      expect(resp.status).toEqual(409);
      expect(respData.errors[0].message).toEqual(
        `TODO List name ${todoListName} is too long. 25 characters allowed.`
      );
    });

    it('Can not create TodoList with empty name', async () => {
      const todoListName = '';
      const resp = await TodoListApi.createTodoList(todoListName);
      const respData = resp.data as ErrorResponse;
      expect(resp.status).toEqual(400);
      expect(respData.errors[0].message).toEqual(
        `Bad request. todoName must be specified.`
      );
    });
  });

  describe('GET: /tasks - Get all TodoLists', () => {
    let todoListNames: any[] = [];
    const todoIds: string[] = [];
    beforeAll(async () => {
      await cleanDb();
      todoListNames = ['test', '   !@#$%^&*', 'QWE !@# 12   '];
      for (const name of todoListNames) {
        const {
          data: { todo_list_id }
        } = (await TodoListApi.createTodoList(name)) as AxiosResponse<ITodo>;
        todoIds.push(todo_list_id);
      }
    });
    it('Can get all todo lists', async () => {
      const resp = await TodoListApi.getAllTodoLists();
      const respData = resp.data as ITodo[];
      expect(resp.status).toEqual(200);
      expect(respData.length).toEqual(3);
      expect(respData[0].todo_name).toEqual(todoListNames[0]);
      expect(respData[1].todo_name).not.toEqual(todoListNames[1]);
      expect(respData[1].todo_name).toEqual(todoListNames[1].trim());
      expect(respData[2].todo_name).not.toEqual(todoListNames[2]);
      expect(respData[2].todo_name).toEqual(todoListNames[2].trim());
    });

    it('GET: /:todoId - can get particular TodoList by ID', async () => {
      const resp1 = await TodoListApi.getTodoList(todoIds[0]);
      const respData1 = resp1.data as ITodo;
      expect(resp1.status).toEqual(200);
      expect(respData1.todo_name).toEqual(todoListNames[0]);

      const resp2 = await TodoListApi.getTodoList(todoIds[1]);
      const respData2 = resp2.data as ITodo;
      expect(resp2.status).toEqual(200);
      expect(respData2.todo_name).toEqual(todoListNames[1].trim());
    });

    it('GET: /:todoId - can not get TodoList by name', async () => {
      const resp = await TodoListApi.getTodoList(todoListNames[0]);
      const respError = resp.data as ErrorResponse;
      expect(resp.status).toEqual(404);
      expect(respError.errors[0].message).toEqual(
        `TODO id '${todoListNames[0]}' has not valid syntax.`
      );
    });

    it('GET: /:todoId - can not get TodoList by not existing ID', async () => {
      const fakeId = randomUuid();
      const resp = await TodoListApi.getTodoList(fakeId);
      const respError = resp.data as ErrorResponse;
      expect(resp.status).toEqual(404);
      expect(respError.errors[0].message).toEqual(
        `No TodoList Found.`
      );
    });
  });
});
