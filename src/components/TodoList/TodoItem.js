import React, { useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import useTodos from "../../hooks/useTodos";

export default function TodoItem({ title, isCompleted, id, handleClick }) {
  const [editTitle, setEditTitle] = useState(title ?? "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todos, setTodos] = useTodos();

  function handleUpdate(id, title) {
    if (isUpdating) {
      setIsUpdating(false);
      setEditTitle(title);
    } else {
      setIsUpdating(true);
    }

    let copy_todos = [...todos];
    copy_todos.forEach((todo, index) => {
      if (todo.id === id) {
        todo.title = editTitle;
      }
    });
    setTodos(copy_todos);
    localStorage.setItem("todos", JSON.stringify(copy_todos));
  }

  function handleEditChange(e) {
    setEditTitle(e.target.value);
  }

  function handleDelete() {
    const copy_todos = [...todos];
    const filteredTodos = copy_todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  }

  return (
    <li>
      <div
        data-testid="todo-item"
        className="flex items-center justify-between w-full py-4 mb-3 bg-[#212121] opacity-[0.7] rounded-lg text-white px-4"
      >
        <span className="flex">
          <button
            onClick={() => handleClick(id)}
            className={[
              "w-5 h-5 rounded-full border-2 block mr-3",
              isCompleted ? "bg-white" : null,
            ].join(" ")}
            data-testid="check-icon"
          >
            {isCompleted && <CheckIcon className="text-[#212121]" />}
          </button>
          {isUpdating ? (
            <input
              value={editTitle}
              onChange={handleEditChange}
              id="edit-title-input"
              className="px-2 py-3 bg-transparent w-[900px] border-2 outline-none"
              style={{ borderColor: "#aaa" }}
            />
          ) : (
            <span
              data-testid="title"
              className={[isCompleted ? "line-through" : null].join(" ")}
            >
              {title}
            </span>
          )}
        </span>
        <span>
          <button
            data-testid="update-btn"
            className="bg-orange-600 px-4 py-2 rounded-lg mr-4"
            onClick={() => handleUpdate(id, editTitle)}
          >
            {isUpdating ? "Save" : "Update"}
          </button>
          <button
            data-testid="remove-btn"
            className="bg-red-600 p-2 rounded-lg px-3"
            onClick={handleDelete}
          >
            X
          </button>
        </span>
      </div>
    </li>
  );
}
