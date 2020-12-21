import axios, { AxiosError, AxiosResponse } from 'axios';
import * as http from 'http';

declare global {
  type uuidv4 = string & { _typeQualifier: void };
}
export const API_BASE_URL = 'http://localhost:3002';

export interface RestError {
  message: string;
  debugInfo?: string;
}
export interface ErrorResponse {
  errors: RestError[];
}

export class AxiosUtils {
  public static createInstance = (baseUrl: string, headers = {}) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        ...headers
      },
      httpAgent: new http.Agent()
    });
    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => response,
      (error: AxiosError) => error.response as AxiosResponse<ErrorResponse>
    );

    return instance;
  };
}
