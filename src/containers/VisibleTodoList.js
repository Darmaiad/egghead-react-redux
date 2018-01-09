import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
// All the knowledge of the state is encapsulated inside this method,
// so when we call it below, we can pass the whole state object
import { getVisibleTodos } from './../reducers/index'; // index may not be needed
import TodoList from '../components/TodoList';
import { fetchTodos } from './../mockBackend';


// We need to insert lifecycle hooks to fetch the data fromt he DB
// connect() already uses lifecycle hooks and we cannot override them
// Insteas, we will create a class that will render the presentational component and will have lifecycle hooks of its own
class VisibleTodoListToBeConnected extends React.Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then((todos) => {
      console.log(this.props.filter, todos);
    });
  }

  componentDidUpdate(prevProps) {
    fetchTodos(this.props.filter).then((todos) => {
      if (this.props.filter !== prevProps.filter) {
        console.log(this.props.filter, todos);
      }
    });
  }

  render() {
    return <TodoList {...this.props} />;
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
const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};


// withRouter is a HOC that injects the router params to the connected component
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoListToBeConnected));

VisibleTodoListToBeConnected.propTypes = {
  filter: PropTypes.string,
};

export default VisibleTodoList;
