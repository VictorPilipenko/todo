import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";

const TodoItem = ({
  content,
  handleClickContent,
  handleClickButton,
  itemId,
  completed,
}) => (
    <div
      className="todo-item"
    >
      <ListItem
        button
        onClick={() => handleClickContent(itemId)}
      >
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText
          inset
          primary={content}
          style={{ textDecoration: completed ? "line-through" : "none" }}
        />
      </ListItem>

      <button
        type="button"
        className="todo-item__button"
        onClick={() => handleClickButton(itemId)}
        tabIndex="0"
      >
        <IconContext.Provider value={{ className: 'todo-item__button-icon' }}>
          <FaTimes />
        </IconContext.Provider>
      </button>
    </div>
  );

TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  handleClickContent: PropTypes.func.isRequired,
  handleClickButton: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
