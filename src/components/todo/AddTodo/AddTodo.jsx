import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class AddTodo extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    content: '',
    user: '',
  };

  handleChange = (ev) => {
    this.setState({ content: ev.target.value });
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  renderForm() {
    const { handleSubmit } = this.props;
    const { content } = this.state;
    const { classes } = this.props;

    console.log(this.state.user);

    return (

      <form className="add-todo">
        <InputLabel style={{ display: 'block' }}>
          <b>What needs to be done?</b>
        </InputLabel>
        <Input
          placeholder="Add your todo..."
          required
          onChange={this.handleChange}
          value={content}
          type="text"
          tabIndex="0"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(ev) => {
            handleSubmit(ev, content, this.state.user);
            this.setState({ content: '', user: '' });
          }}
          disabled={!content}
          tabIndex="0"
        >
          Add Todo
        </Button>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="user-simple">Executor</InputLabel>
          <Select
            value={this.state.user}
            onChange={this.handleChangeSelect}
            inputProps={{
              name: 'user',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              None
            </MenuItem>
            {this.props.todoListFull.map((text, index) =>
              <MenuItem key={index} value={text}>
                {text}
              </MenuItem>

            )}
          </Select>
        </FormControl>

      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

AddTodo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTodo);