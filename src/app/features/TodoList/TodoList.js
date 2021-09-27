// we need to install our UI component library
// npm install @mui/material@next @emotion/react @emotion/styled
// npm install @mui/icons-material@next

// we're using material ui under the hood for our own component library called "Prism"

// import hooks we might need from react
// Hooks are functions that let you “hook into” React state and lifecycle features from function components.
// Hooks don’t work inside classes — they let you use React without classes
import { useState, useEffect } from "react";

// get components from our components library (like Prism)
import { Button, CircularProgress, TextField } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

// import functions to call our "API"
import { getTodos, postTodo, deleteTodo } from "../../services/todosApi";

// using react's traditional styling, we will be using "styled-components"
const rowStyle = {
  display: "flex",
  alignItems: "center",
  width: 250,
  justifyContent: "space-between",
};

const TodoListExample = () => {
  // Managing state in a React application is really important.
  // And the most modern way to handle state variables in an app is to use a function called useState
  const [isProcessing, setIsProcessing] = useState("loading");
  // array destructuring, returns two values, the name of the var and function to set the value
  // ex. const fruit = ["apple", "banana", "grape"]
  // const [red, yellow, purple] = fruit
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // useEffects are typically used to manage side effects that aren't related to the components render
  // So things like console messages, loading data, and sometimes animations can benefit from useEffect
  // all effects evaluated after first render and every render after that
  useEffect(() => {
    // takes a callback functions
    async function fetchTodos() {
      let response = await getTodos();
      setTodos(response);
      setIsProcessing("done");
    }

    fetchTodos();
  }, []); // "dependency array", only run this effect when these vars change, no vars means run once only

  // one of most recent additions to jS are "async" functions with "await" keyword
  // An async function is a function that knows how to expect the possibility of the await
  // keyword being used to invoke asynchronous code
  // (syntactic sugar on top of promises)
  const addTodo = async () => {
    setIsProcessing("loading");
    // await can be put in front of any async promise-based function to pause your code
    //  on that line until the promise fulfills, then return the resulting value
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

  // "e" is the event returned from the html <input> element
  const handleTextFieldChange = (e) => {
    setNewTodo(e.target.value);
  };

  // JSX (Javascript as XML), language extension that allows you to write tags directly in JS
  // Who understands JSX?. Here We need a transpiler that understands JSX and converts it to a format that can run on browser. Babel does just this job.
  return (
    // Adjacent JSX elements must be wrapped in an enclosing tag, use React.Fragment shorthand
    <>
      <h1>Todo List Example</h1>
      {/* conditional rendering */}
      {isProcessing === "loading" && <CircularProgress />}
      {isProcessing === "done" && (
        <ul>
          {todos.map((todo) => (
            // Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity
            <li key={todo.id}>
              <div style={rowStyle}>
                {/* jsx expression */}
                {todo.action}
                <Button onClick={() => removeTodo(todo.id)} color="error">
                  <Delete />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* this could be placed in another component like <TodoListFooter/> */}
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
