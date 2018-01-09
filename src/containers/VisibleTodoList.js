import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
// All the knowledge of the state is encapsulated inside this method,
// so when we call it below, we can pass the whole state object
import { getVisibleTodos } from './../reducers/index'; // index may not be needed
import TodoList from '../components/TodoList';

// We need to insert lifecycle hooks to fetch the data fromt he DB
// connect() already uses lifecycle hooks and we cannot override them
// Insteas, we will create a class that will render the presentational component and will have lifecycle hooks of its own
class VisibleTodoListToBeConnected extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const {filter, fetchMockTodos} = this.props;
    fetchMockTodos(filter);
  }

  render() {
    // toggle todo need to be passed with the name onTodoClick because that is what TodoList compoent expects
    const {toggleTodo, ...rest} = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}

// We can take the getVisibleTodos function outside of the view layer and place it instead inside the file that
// determines the internal structure of todos, the TodosReducer
// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'all':
//       return todos;
//     case 'completed':
//       return todos.filter((t) => t.completed);
//     case 'active':
//       return todos.filter((t) => !t.completed);
//     default:
//       throw new Error('Unknown filter: ' + filter);
//   }
// };
// That way, If we want to change the state that we pass to this component from an array of todos
// we can, without changing the component's code, because it does not rely on the state shape any more

// Instead of ownProps, we use ES6 destructiring syntax to make it a little shorter
// It will be convenient to have the filter as a prop, so we will return it
const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'; /* Since param.filter is empty on the root path, we add 'all' as a fallback*/
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

/* Shorthand notation of:
  const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch(toggleTodo(id));
    },
  };
  Which is already shortened
*/

// withRouter is a HOC that injects the router params to the connected component
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions // instead of { onTodoClick: toggleTodo, receiveTodos, }
)(VisibleTodoListToBeConnected));

VisibleTodoListToBeConnected.propTypes = {
  filter: PropTypes.string,
  receiveTodos: PropTypes.func,
};

export default VisibleTodoList;
