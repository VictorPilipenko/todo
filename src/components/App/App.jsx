import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import SignInContainer from '../auth/SignIn/SignInContainer';
import TodoListContainer from '../todo/TodoList/TodoListContainer';
import SignUpContainer from '../auth/SignUp/SignUpContainer';
import {
  MAIN,
  LOGIN,
  REGISTER,
} from '../../routes';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route path={LOGIN} component={SignInContainer} />
        <Route path={REGISTER} component={SignUpContainer} />
        <Route path={MAIN} component={TodoListContainer} />
      </Switch>
    </MuiThemeProvider>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
