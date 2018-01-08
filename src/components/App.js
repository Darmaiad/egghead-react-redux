import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = ({ match }) => (
  <div>
    <AddTodo />
    {/* Since param.filter is empty on the root path we add 'all' as a fallback*/}
    <VisibleTodoList filter={match.params.filter || 'all'}/>
    <Footer />
  </div>
);

export default App;
