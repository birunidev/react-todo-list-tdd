import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ data, handleClick }) {
  const completedTodos = data?.filter((todo) => todo.isCompleted);
  const todos = data?.filter((todo) => !todo.isCompleted);

  return (
    <div className="my-6 h-[662px] overflow-y-scroll todo-list">
      <ul data-testid="todo-list">
        {todos?.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              title={todo.title}
              id={todo.id}
              handleClick={handleClick}
              isCompleted={todo.isCompleted}
            />
          );
        })}
      </ul>
      {completedTodos.length >= 1 && (
        <p data-testid="completed-section" className="text-white mb-3 mt-7">
          Completed ({completedTodos.length})
        </p>
      )}

      <ul data-testid="completed-todo-list">
        {completedTodos?.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              title={todo.title}
              id={todo.id}
              handleClick={handleClick}
              isCompleted={todo.isCompleted}
            />
          );
        })}
      </ul>
      {data?.length === 0 && (
        <div
          data-testid="empty-comp"
          className="text-center bg-[#212121] opacity-[0.8] max-w-[220px] mx-auto py-5 rounded text-white"
        >
          <div className="w-[100px] h-[50px] mx-auto py-3 flex items-center my-4">
            <img className="w-full" src="/calendar.png" alt="" />
          </div>
          <p>No Task Today ?</p>
          <p>Try to add some here</p>
        </div>
      )}
    </div>
  );
}
