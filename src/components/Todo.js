import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import AssignmentIcon from 'material-ui-icons/Assignment';

const Todo = ({ onClick, completed, text }) => (
  <ListItem
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    <AssignmentIcon color="primary" />{text}
  </ListItem>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
