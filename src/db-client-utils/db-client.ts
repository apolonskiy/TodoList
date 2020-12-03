import { Client } from 'pg';

export const client = new Client({
  user: 'apolonskyi',
  host: 'localhost',
  database: 'todo-list',
  password: 'Passw0rd!',
  port: 5454
});
client.connect();
