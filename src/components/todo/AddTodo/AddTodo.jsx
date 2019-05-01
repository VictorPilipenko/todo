import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class AddTodo extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    content: '',
  };

  handleChange = (ev) => {
    this.setState({ content: ev.target.value });
  };

  renderForm() {
    const { handleSubmit } = this.props;
    const { content } = this.state;

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
            handleSubmit(ev, content);
            this.setState({ content: '' });
          }}
          disabled={!content}
          tabIndex="0"
        >
          Add Todo
        </Button>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default AddTodo;
