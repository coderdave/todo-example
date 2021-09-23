let todos = [];

export const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  todos = [
    {
      id: 1,
      action: "drink coffee",
    },
    {
      id: 2,
      action: "learn typescript",
    },
    { id: 3, action: "get lunch" },
  ];

  return todos;
};

export const postTodo = async (newTodo) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const lastTodo = todos[todos.length - 1];
  const newTodoId = (lastTodo?.id || 0) + 1;
  todos = [...todos, { id: newTodoId, action: newTodo }];

  return todos;
};

export const deleteTodo = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  todos = todos.filter((todo) => todo.id !== id);

  return todos;
};
