import React from 'react';
import PropTypes from 'prop-types';
import './TodoListFilter.css';
import Button from '@material-ui/core/Button';

const TodoListFilter = ({ filters, handleClick, currentFilter }) => (
  <div className="todo-list-filter">
    {
      filters.map((filter,index) => (
        <Button
          onClick={() => handleClick(filter)}
          key={index}
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
