import { client as dbClient } from '../../src/db-client-utils/db-client';
import uuidv4 from 'uuid/v4';

export const cleanDb = async () => {
  try {
    return dbClient.query('DELETE FROM tdl.todo_list');
  } catch (e) {
    console.log(e);
  }
};

export const randomUuid = () => {
  return uuidv4() as uuidv4;
};
