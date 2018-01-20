import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

// App component does not need the router params from the router
// It just passed it down to VisibleTodoList
// Instead, we will have VisibleTodoList to take the params with withRouter()
const App = () => {
  console.log(this);
return (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
};
export default App;
