import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from '@material-ui/core/styles';

//utils
import { signOut } from "./actions";
import * as routes from "../../utils/routes";
import "./Navigation.css";

import SidePanel from '../../components/SidePanel'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ menuOpen: false, anchorEl: null });
  };

  isLandingPage = () => {
    const { pathname } = this.props.location;
    return pathname === routes.LANDING ? true : false;
  };

  renderSignIn = () => (
    <AppBar position="fixed" className="Navigation">
      <Toolbar>
        <Typography variant="title" color="inherit" className="title">
          &nbsp;
        </Typography>
        <Link to={routes.SIGN_IN} className="signIn">
          <Button variant="raised" color="default">
            Sign In
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );

  renderMenu = (menuOpen, anchorEl) => {

    // console.log(this.props.classes)
    return this.props.authUser !== null ? (
      <React.Fragment>
        <AppBar position="fixed" className="Navigation">
          <Toolbar>
            <Typography variant="title" color="inherit" className="title">
              <Link to={routes.HOME} className="signIn">
                Firebase
            </Link>
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
                <Link to={routes.ACCOUNT} className="links">
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Link>
                <MenuItem onClick={this.props.onSignOut}>Sign Out</MenuItem>
              </Menu>

            </React.Fragment>
          </Toolbar>
        </AppBar>

        <SidePanel />
      </React.Fragment>

    ) : null;
  };

  render() {
    const { menuOpen, anchorEl } = this.state;
    const isLanding = this.isLandingPage();
    return isLanding
      ? this.renderSignIn()
      : this.renderMenu(menuOpen, anchorEl);
  }
}
Navigation.propTypes = {
  onSignOut: PropTypes.func
};

const mapStateToProps = state => ({
  authUser: state.app.authUser
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(signOut())
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Navigation);
