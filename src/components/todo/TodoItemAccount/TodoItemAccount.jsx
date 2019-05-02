import React from 'react';
import PropTypes from 'prop-types';
import './TodoItemAccount.css';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoItemAccount extends React.Component {
  state = {
    displayDefault: 'flex',
    displayEdit: 'none',
    name: this.props.content,
  }

  displayDefault = () => {
    return ({
      display: this.state.displayDefault
    })
  }

  displayEdit = () => {
    return ({
      display: this.state.displayEdit
    })
  }

  onClickButtonEdit = () => {
    this.setState({
      displayDefault: 'none',
      displayEdit: 'flex'
    })
  }

  onClickButtonSave = () => {
    this.setState({
      displayDefault: 'flex',
      displayEdit: 'none'
    }, () => this.forceUpdate())
  }

  onClickButtonCancel = () => {
    this.setState({
      displayDefault: 'flex',
      displayEdit: 'none'
    })
  }

  onClickDeleteItem = () => {
    this.props.handleClickButton(this.props.itemId);
  }

  onClickEditItem = () => {
    this.props.handleClickContentUpdate(this.props.itemId, this.state.name);
    this.onClickButtonSave();
  }

  getNameItem = e => {
    this.setState({
      name: e.target.value
    })
  }


  render() {
    console.log(this.props.itemId)
    return (
      <div
        className="todo-item"
      >
        <ListItem
          button
          onClick={() => this.props.handleClickContent(this.props.itemId)}
          style={this.displayDefault()}
        >
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText
            inset
            primary={this.state.name}
            style={{ textDecoration: this.props.completed ? "line-through" : "none" }}
          />
        </ListItem>


        <Input
          type="text"
          name="nameItemEdit"
          style={this.displayEdit()}
          onChange={this.getNameItem}
        />

        <Button
          style={this.displayDefault()}
          onClick={this.onClickButtonEdit}
        >
          edit
          </Button>

        <div className='edit-wrapper'>
          <Button
            style={this.displayEdit()}
            onClick={this.onClickEditItem}
          >
            apply
            </Button>

          <Button
            style={this.displayEdit()}
            onClick={this.onClickButtonCancel}
          >
            cancel
          </Button>
        </div>

        <Button
          onClick={this.onClickDeleteItem}
          tabIndex="0"
          style={this.displayDefault()}
        >
            <DeleteIcon />
        </Button>

      </div>
    );
  }
}

TodoItemAccount.propTypes = {
  content: PropTypes.string.isRequired,
  handleClickContent: PropTypes.func.isRequired,
  handleClickButton: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItemAccount;
