import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItemAccount from './TodoItemAccount';
import { deleteTodo, toggleTodoState, editTodo } from '../../../store/actions/todo';
import { database } from '../../../store/firebase';

class TodoItemAccountContainer extends Component {
  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleComplete: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
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

  handleClickContentUpdate = (id, content) => {
    const { handleContentUpdate } = this.props;
    handleContentUpdate(id, content);
    database.ref(`users/${localStorage.getItem('uid')}/todolist/${id}`).update({
      content: content,
    });
  };

  render() {
    const { content, itemId, completed } = this.props;
    console.log(itemId)
    return (
      <TodoItemAccount
        itemId={itemId}
        content={content}
        handleClickButton={this.handleClickButton}
        handleClickContent={this.handleClickContent}
        handleClickContentUpdate={this.handleClickContentUpdate}
        completed={completed}
      />
    );
  }
}

const mapDispatchToState = dispatch => ({
  handleDelete: id => dispatch(deleteTodo(id)),
  handleComplete: (id, completed) => dispatch(toggleTodoState(id, completed)),
  handleContentUpdate: (id, content) => dispatch(editTodo(id, content)),
});

export default connect(null, mapDispatchToState)(TodoItemAccountContainer);
