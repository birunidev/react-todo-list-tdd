import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";

export default function useTodos() {
  const [todos, setTodos] = useContext(TodoContext);
  return [todos, setTodos];
}
