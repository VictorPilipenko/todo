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
import Divider from '@material-ui/core/Divider';

import * as routes from "../../utils/routes";
import { Link, withRouter } from "react-router-dom";
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

function ClippedDrawer(props) {
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

          <Link to={routes.HOME} className="links">
            <ListItem button key={'Home'}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>

          <Link to={routes.ACCOUNT} className="links">
            <ListItem button key={'Account'}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={'Account'} />
            </ListItem>
          </Link>

          <Divider />

          <Link to={routes.HOME} className="links">
            <ListItem button key={'Home'}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>

          <Link to={routes.ACCOUNT} className="links">
            <ListItem button key={'Account'}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={'Account'} />
            </ListItem>
          </Link>

        </List>
      </Drawer>
    </React.Fragment>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles)
)(ClippedDrawer);