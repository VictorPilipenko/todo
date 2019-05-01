import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import './TodoListFilter.css';
import Button from '@material-ui/core/Button';

const TodoListFilter = ({ filters, handleClick, currentFilter }) => (
  <div className="todo-list-filter">
    {
      filters.map(filter => (
        <Button
          onClick={() => handleClick(filter)}
        >
          {filter}
        </Button>
      ))
    }
  </div>
);

TodoListFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TodoListFilter;
