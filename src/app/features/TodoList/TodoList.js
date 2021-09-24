import { useState, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { getTodos, postTodo, deleteTodo } from "../../services/todosApi";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  width: 250,
  justifyContent: "space-between",
};

const TodoListExample = () => {
  const [isProcessing, setIsProcessing] = useState("loading");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      debugger;
      let response = await getTodos();
      setTodos(response);
      setIsProcessing("done");
    }

    fetchTodos();
  }, []);

  const addTodo = async () => {
    setIsProcessing("loading");
    let response = await postTodo(newTodo);
    setIsProcessing("done");
    setTodos(response);
    setNewTodo("");
  };

  const removeTodo = async (id) => {
    setIsProcessing("loading");
    let response = await deleteTodo(id);
    setIsProcessing("done");
    setTodos(response);
  };

  const handleTextFieldChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <>
      <h1>Todo List Example</h1>
      {isProcessing === "loading" && <CircularProgress />}
      {isProcessing === "done" && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div style={rowStyle}>
                {todo.action}
                <Button onClick={() => removeTodo(todo.id)} color="error">
                  <Delete />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p />
      <TextField
        variant="outlined"
        size="small"
        onChange={handleTextFieldChange}
        value={newTodo}
        disabled={isProcessing === "loading"}
      />
      <p />
      <Button
        disabled={isProcessing === "loading" || newTodo === ""}
        onClick={addTodo}
        variant="contained"
        color="primary"
      >
        Add Todo
      </Button>
    </>
  );
};

export default TodoListExample;
