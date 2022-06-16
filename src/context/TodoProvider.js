import React, { useEffect, useState } from "react";

export const TodoContext = React.createContext([]);

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
}
