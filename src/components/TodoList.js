import React from 'react';
import PropTypes from 'prop-types';
// We gotta be aware of named exports
import List from 'material-ui/List';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
    <List>
      {todos.map((todo) =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </List>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
