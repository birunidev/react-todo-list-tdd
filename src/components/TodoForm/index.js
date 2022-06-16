import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
export default function TodoForm({ value, onChange, error, onKeyDown }) {
  return (
    <div className="todo-form w-full relative my-6">
      <PlusIcon className="absolute w-6 h-6 text-white z-10 top-[13px] left-[10px]" />
      <input
        type="text"
        placeholder="Add a Task"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="px-3 py-4 rounded-md w-full block outline-none bg-[#212121] opacity-[0.7] text-white pl-12 pr-9 placeholder-white"
      />
      <p className="text-red-400 mt-2" data-testid="error-message">
        {error}
      </p>
    </div>
  );
}
