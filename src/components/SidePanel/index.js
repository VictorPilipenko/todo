import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {
  MAIN,
  ACCOUNT,
  FOREXECUTION,
} from '../../routes';
import { Link } from "react-router-dom";
import { compose } from "recompose";

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
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function SidePanel(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>

          <Link to={MAIN} className="links">
            <ListItem button key={'Dashboard'}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </Link>

          <Link to={ACCOUNT} className="links">
            <ListItem button key={'Account'}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={'Account'} />
            </ListItem>
          </Link>

          <Link to={FOREXECUTION} className="links">
            <ListItem button key={'For Execution'}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={'For Execution'} />
            </ListItem>
          </Link>

        </List>
      </Drawer>
    </React.Fragment>
  );
}

SidePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(SidePanel);
