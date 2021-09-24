import { useState, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { getTodos, postTodo, deleteTodo } from "../../services/todosApi";
import TodoRow from "./components/TodoRow";

const TodoListExample = () => {
  const [isProcessing, setIsProcessing] = useState("loading");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
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
            <TodoRow key={todo.id} todo={todo} handleRemoveTodo={removeTodo} />
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
