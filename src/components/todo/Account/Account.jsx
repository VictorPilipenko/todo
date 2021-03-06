import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TodoItemAccountContainer from '../TodoItemAccount/TodoItemAccountContainer';
import Preloader from '../../Preloader/Preloader';
import SignOutContainer from '../../auth/SignOut/SignOutContainer';
import TodoListFilterContainer from '../TodoListFilter/TodoListFilterContainer';
import AddTodoContainer from '../AddTodo/AddTodoContainer';
import { ALL, ACTIVE, COMPLETED } from '../../../store/constants/filterTypes';
import './Account.css';
import Fade from '../../Fade/Fade';

import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SidePanel from '../../SidePanel'

class Account extends React.Component {
  state = {
    menuOpen: false,
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ menuOpen: false, anchorEl: null });
  };



  render() {
    const { todoList, isFetching, currentFilter } = this.props;
    const { menuOpen, anchorEl } = this.state;

    if (isFetching) {
      return <Preloader />;
    }

    return (
      <React.Fragment>
        <AppBar position="fixed" className="Navigation">
          <Toolbar>
            <Typography variant="title" color="inherit" className="title">
              <TodoListFilterContainer />
            </Typography>

            <Typography color="inherit" className="title">
              It's you: {localStorage.getItem('uid')}
            </Typography>

            <React.Fragment>
              <IconButton
                aria-owns={menuOpen ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={this.handleClose}
              >
                <NavLink to={'/account'} className="links">
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </NavLink>
                <MenuItem><SignOutContainer /></MenuItem>
              </Menu>

            </React.Fragment>
          </Toolbar>
        </AppBar>

        <SidePanel />






        <div className="todo-list">
          <div className="todo-list__items">

            <AddTodoContainer todoListFull={this.props.todoListFull} />
            <TransitionGroup>
              {console.log(todoList)}
              {todoList && todoList.map(todo => (
                // console.log(todo.key)
                <Fade key={todo.key}>
                  <TodoItemAccountContainer
                    itemId={todo.key}
                    content={todo.content}
                    completed={todo.completed}
                  />
                </Fade>
              ))}
            </TransitionGroup>

            {!todoList.length
              && currentFilter === ALL
              && (
                <TransitionGroup>
                  <Fade>
                    <p className="todo-list__empty-text">Add your first todo ;)</p>
                  </Fade>
                </TransitionGroup>
              )}
            {!todoList.length
              && currentFilter === ACTIVE
              && (
                <TransitionGroup>
                  <Fade>
                    <p className="todo-list__empty-text">You are complete all your todos ^^</p>
                  </Fade>
                </TransitionGroup>
              )}
            {!todoList.length
              && currentFilter === COMPLETED
              && (
                <TransitionGroup>
                  <Fade>
                    <p className="todo-list__empty-text">You are not complete any of your todo :)</p>
                  </Fade>
                </TransitionGroup>

              )}
          </div>
        
        </div>
      </React.Fragment>
    )
  }
}

Account.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default Account;
