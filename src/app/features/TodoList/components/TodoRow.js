import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  width: 250,
  justifyContent: "space-between",
};

const TodoRow = (props) => {
  const { todo, handleRemoveTodo } = props;

  return (
    <li>
      <div style={rowStyle}>
        {todo.action}
        <Button onClick={() => handleRemoveTodo(todo.id)} color="error">
          <Delete />
        </Button>
      </div>
    </li>
  );
};

TodoRow.propTypes = {
  todo: PropTypes.object,
  handleRemoveTodo: PropTypes.func,
};

export default TodoRow;
