import { useEffect, useState } from "react";
import "./App.css";
import { PageTitle, Sidebar, TodoForm, TodoList } from "./components";
import useTodos from "./hooks/useTodos";
// import { todos } from "./constants";
function App() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useTodos();
  useEffect(() => {
    if (title !== "") {
      setError("");
    }
  }, [title]);

  function handleChange(e) {
    setTitle(e.target.value);
  }
  function handleAddTodo(e) {
    if (e.keyCode === 13) {
      if (title === "") {
        setError("This field is required");
        return;
      }
      let copy_todos = [...todos];
      copy_todos.push({
        id: +new Date(),
        title: title,
        date: new Date(),
        isCompleted: false,
      });
      setTodos(copy_todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      setTitle("");
    }
  }

  function handleUpdateTodo(id) {
    let copy_todos = [...todos];
    copy_todos.forEach((todo) => {
      if (id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(copy_todos);
  }

  return (
    <div className="App">
      <div className="flex">
        <Sidebar activePage={"/"} />
        <div
          className="h-[100vh] ml-[320px] w-full "
          style={{
            backgroundImage: `url(/bg.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-[90%] mx-auto mt-9 relative">
            <PageTitle title="My Daily Task" date={new Date()} />
            <TodoList data={todos} handleClick={handleUpdateTodo} />
            <TodoForm
              onKeyDown={handleAddTodo}
              onChange={handleChange}
              value={title}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
