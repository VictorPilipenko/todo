import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Preloader/Preloader';
import { getTodoListFullRequest } from '../../../store/actions/todo';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SidePanel from '../../SidePanel'
import SignOutContainer from '../../auth/SignOut/SignOutContainer';
import { compose } from "recompose";
import PropTypes from 'prop-types';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class TodoItemDetails extends React.Component {

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

  componentDidMount() {
    const { getTodoList } = this.props;
    getTodoList();
  }

  render() {
    const { todo, id } = this.props;
    const { todoList, isFetching } = this.props;
    const { menuOpen, anchorEl } = this.state;

    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;


    console.log(todo.key)


    if (todo.key === id) {
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    date: {new Date(parseInt(todo.created_at)).toString()}
                  </Typography>

                  <Typography variant="h5" component="h2">
                    todo: {todo.content}
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    owner: {todo.owner}
                    <br />
                    executor: {todo.executor}
                  </Typography>

                  <Typography component="p">
                    completed: {todo.completed.toString()}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <Preloader />
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let arr = [];
  let item = [];
  const id = ownProps.match.params.id;
  const todos = state.todo.listFull;

  Object.values(todos).forEach(function (snap) {
    Object.values(snap).forEach(function (snap2) {
      Object.entries(snap2).map(e => arr.push(Object.assign(e[1], { key: e[0] })))
    })
  })

  arr && arr.map((todo) => (
    todo.key === id ?
      item = todo
      : null
  ))

  return {
    todo: item,
    id: id
  }
}

const mapDispatchToState = dispatch => ({
  getTodoList: () => (
    dispatch(getTodoListFullRequest())
  ),
});


TodoItemDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToState)
)(TodoItemDetails);
