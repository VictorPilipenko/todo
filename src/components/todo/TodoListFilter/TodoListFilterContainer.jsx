import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoListFilter from './TodoListFilter';
import { setTodoListFilter } from '../../../store/actions/todo';
import { getFilterState } from '../../../store/selectors';
import {
  ALL,
  COMPLETED,
  ACTIVE,
} from '../../../store/constants/filterTypes';

class TodoListFilterContainer extends Component {
  static propTypes = {
    handleFilter: PropTypes.func.isRequired,
    currentFilter: PropTypes.string.isRequired,
  };

  handleClick = (filter) => {
    const { handleFilter } = this.props;
    handleFilter(filter);
  };

  render() {
    const { currentFilter } = this.props;

    return (
      <TodoListFilter
        currentFilter={currentFilter}
        filters={[ALL, ACTIVE, COMPLETED]}
        handleClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = store => ({
  currentFilter: getFilterState(store),
});

const mapDispatchToState = dispatch => ({
  handleFilter: filter => dispatch(setTodoListFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToState)(TodoListFilterContainer);
