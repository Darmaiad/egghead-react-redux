import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

/* Changed the filter naming pattern from constants to the url params we use*/
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter((t) => t.completed);
    case 'active':
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

// Instead of ownProps, we use ES6 destructiring syntax to make it a little shorter
const mapStateToProps = (state, {match}) => ({
  todos: getVisibleTodos(
    state.todos,
    match.params.filter || 'all' /* Since param.filter is empty on the root path we add 'all' as a fallback*/
  ),
});

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};

// withRouter is a HOC that injects the router params to the connected component
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
