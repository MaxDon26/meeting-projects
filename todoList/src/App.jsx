import { Button, Flex, Paper, TextInput } from "@mantine/core";
import "./App.css";
import { Todo, FilterGroup } from "./components";
import { useEffect, useState } from "react";
import todosService from "./service/todo.service";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    todosService.get(filter).then((data) => {
      setTodos(data);
    });
  }, [filter]);

  const handleCreate = async (e, content) => {
    e.preventDefault();
    const newTodo = await todosService.create({
      id: Date.now(),
      content,
      created: Date.now(),
      completed: false,
    });

    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.push(newTodo);
      return newTodos;
    });
  };

  const handleUpdate = async (payload) => {
    console.log(payload);
    const updatedTodo = await todosService.update(payload);

    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };
  return (
    <div className="todoList">
      <form onSubmit={(e) => handleCreate(e, todoValue)}>
        <Flex
          mih={50}
          gap="sm"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <TextInput
            style={{ flexGrow: 1 }}
            size="md"
            radius="lg"
            placeholder="Input placeholder"
            value={todoValue}
            onChange={({ target }) => setTodoValue(target.value)}
          />
          <Button
            type="submit"
            variant="filled"
            color="cyan"
            size="md"
            radius="lg"
          >
            Добавить задачу
          </Button>
        </Flex>
        <FilterGroup onChange={setFilter} />
        <Paper
          shadow="sm"
          radius="md"
          p="xl"
          style={{ marginTop: 20, background: "#00000050" }}
        >
          <Flex gap="sm" justify="center" align="center" direction="column">
            {todos.map((todo) => (
              <Todo key={todo.id} {...todo} onUpdate={handleUpdate} />
            ))}
          </Flex>
        </Paper>
      </form>
    </div>
  );
}

export default App;
