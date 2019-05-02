import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { addTodo } from '../../../store/actions/todo';
import AddTodo from './AddTodo';
import { database } from '../../../store/firebase';

class AddTodoContainer extends Component {
  static propTypes = {
    handleAdd: PropTypes.func.isRequired,
  };

  handleSubmit = (ev, content, executor) => {
    ev.preventDefault();
    const { handleAdd } = this.props;
    const id = uuid();
    const date = new Date().getTime();

    handleAdd({
      key: id,
      content,
      completed: false,
      created_at: date,
      owner: localStorage.getItem('uid'),
      executor
    });

    // console.log(Object.keys(this.props.todoList))

    // console.log(JSON.stringify(localStorage.getItem('user')))

    database.ref(`users/${localStorage.getItem('uid')}/todolist/${id}`).set({
      content,
      completed: false,
      created_at: date,
      owner: localStorage.getItem('uid'),
      executor
    });
  };

  render() {
    return (
      <div>
        <AddTodo
          handleSubmit={this.handleSubmit}
          todoListFull={this.props.todoListFull}
        />
      </div>
    );
  }
}

const mapDispatchToState = dispatch => ({
  handleAdd: todo => dispatch(addTodo(todo)),
});

export default connect(null, mapDispatchToState)(AddTodoContainer);
