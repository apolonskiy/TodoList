import { AxiosUtils, ErrorResponse, API_BASE_URL } from '../utils/axios-utils';
import { AxiosResponse } from 'axios';

export interface ITodo {
  todo_list_id: string;
  todo_name: string;
}

const TODO_LIST_ROUTE = `/tasks`;

export class TodoListApi {
  static createTodoList = (
    todoName: string
  ): Promise<AxiosResponse<ITodo | ErrorResponse>> => {
    const axios = AxiosUtils.createInstance(API_BASE_URL, {
      'Content-Type': 'application/json'
    });
    return axios.post(TODO_LIST_ROUTE, {
      todoName
    });
  };

  static getAllTodoLists = (): Promise<
    AxiosResponse<ITodo[] | ErrorResponse>
  > => {
    const axios = AxiosUtils.createInstance(API_BASE_URL, {
      'Content-Type': 'application/json'
    });
    return axios.get(TODO_LIST_ROUTE);
  };

  static getTodoList = (
    todoId: string
  ): Promise<AxiosResponse<ITodo | ErrorResponse>> => {
    const axios = AxiosUtils.createInstance(API_BASE_URL, {
      'Content-Type': 'application/json'
    });
    return axios.get(`${TODO_LIST_ROUTE}/${todoId}`);
  };
}
