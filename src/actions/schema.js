import { schema } from 'normalizr';

// The name of the field in the Entity field in the normalized JSON with correspond to the string pass as an arg
export const todo = new schema.Entity('todos');
export const arrayOfTodos = new schema.Array(todo);
