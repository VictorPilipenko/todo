import React from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
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
    </div>
  );

TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  handleClickContent: PropTypes.func.isRequired,
  handleClickButton: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
