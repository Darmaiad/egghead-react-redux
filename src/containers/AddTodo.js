import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  // Well... we use it
  let input; // eslint-disable-line no-unused-vars

  // We get a ton of eslint warnings about the use of 'this' but
  // that's how it works with materialui V1. Maybe with a class component the warning will be supressed
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!this.input.value.trim()) {
          return;
        }
        dispatch(addTodo(this.input.value));
        this.input.value = '';
      }}>
        <TextField placeholder="Add todo" inputRef={(input) => {this.input = input;}} />{' '}
        <Button type="submit" raised color="primary">
          Add Todo
        </Button>
      </form>
    </div>
  );
};

AddTodo = connect()(AddTodo);

AddTodo.propTypes = {
  dispatch: PropTypes.func,
};

export default AddTodo;
