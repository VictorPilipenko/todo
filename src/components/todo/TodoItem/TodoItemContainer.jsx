import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo, toggleTodoState } from '../../../store/actions/todo';
import { database } from '../../../store/firebase';

class TodoItemContainer extends Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleComplete: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
  };

  handleClickButton = (id) => {
    const { handleDelete } = this.props;
    handleDelete(id);
    database.ref(`users/${localStorage.getItem('uid')}/todolist/${id}`).remove();
  };

  handleClickContent = (id) => {
    const { handleComplete, completed } = this.props;
    handleComplete(id, !completed);
    database.ref(`users/${localStorage.getItem('uid')}/todolist/${id}`).update({
      completed: !completed,
    });
  };

  render() {
    const { content, itemId, completed } = this.props;
    console.log(this.props)
    return (
      <TodoItem
        itemId={itemId}
        content={content}
        handleClickButton={this.handleClickButton}
        handleClickContent={this.handleClickContent}
        completed={completed}
      />
    );
  }
}

const mapDispatchToState = dispatch => ({
  handleDelete: id => dispatch(deleteTodo(id)),
  handleComplete: (id, completed) => dispatch(toggleTodoState(id, completed)),
});

export default connect(null, mapDispatchToState)(TodoItemContainer);
