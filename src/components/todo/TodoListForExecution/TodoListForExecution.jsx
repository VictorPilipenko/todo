import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TodoItemContainer from '../TodoItem/TodoItemContainer';
import Preloader from '../../Preloader/Preloader';
import SignOutContainer from '../../auth/SignOut/SignOutContainer';
import './TodoListForExecution.css';
import Fade from '../../Fade/Fade';

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SidePanel from '../../SidePanel'

let arr = [];

class TodoListForExecution extends React.Component {
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

  componentDidUpdate = () => {
    arr = [];
  }

  render() {
    const { todoList, isFetching } = this.props;
    const { menuOpen, anchorEl } = this.state;

    

    if (isFetching) {
      return <Preloader />;
    }

    return (
      <React.Fragment>
        <AppBar position="fixed" className="Navigation">
          <Toolbar>
            <Typography variant="title" color="inherit" className="title">
              {/* <TodoListFilterContainer /> */}
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
                <Link to={'/account'} className="links">
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Link>
                <MenuItem><SignOutContainer /></MenuItem>
              </Menu>

            </React.Fragment>
          </Toolbar>
        </AppBar>

        <SidePanel />

        <div className="todo-list">
          <div className="todo-list__items">
            <TransitionGroup>

              {
                Object.values(todoList).forEach(function (snap) {
                  Object.values(snap).forEach(function (snap2) {
                    Object.entries(snap2).map(e => arr.push(Object.assign(e[1], { key: e[0] })))
                  })
                })
              }

              {console.log(arr)}
        
              {arr && arr.map((todo, index) => (
                todo.executor === localStorage.getItem('uid') ? 
                <Fade key={index}>
                  <TodoItemContainer
                    itemId={todo.key}
                    content={todo.content}
                    completed={todo.completed}
                  />
                </Fade>
                : null
              ))}


            </TransitionGroup>

          </div> 
        </div>
      </React.Fragment>
    )
  }
}

TodoListForExecution.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TodoListForExecution;
