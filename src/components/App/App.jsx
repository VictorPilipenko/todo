import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import SignInContainer from '../auth/SignIn/SignInContainer';
import TodoListContainer from '../todo/TodoList/TodoListContainer';
import SignUpContainer from '../auth/SignUp/SignUpContainer';
import AccountContainer from '../todo/Account/AccountContainer';
import TodoListForExecutionContainer from '../todo/TodoListForExecution/TodoListForExecutionContainer';
import TodoItemDetails from '../todo/TodoItem/TodoItemDetails';
import {
  MAIN,
  LOGIN,
  REGISTER,
  ACCOUNT,
  FOREXECUTION,
  TODODETAILS,
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

const App = () => (
  <BrowserRouter >
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path={MAIN} component={TodoListContainer} />
        <Route path={LOGIN} component={SignInContainer} />
        <Route path={REGISTER} component={SignUpContainer} />
        <Route path={ACCOUNT} component={AccountContainer} />
        <Route path={FOREXECUTION} component={TodoListForExecutionContainer} />
        <Route path={TODODETAILS} component={TodoItemDetails} />
      </Switch>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
