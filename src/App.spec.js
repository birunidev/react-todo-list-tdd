import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";
import TodoProvider from "./context/TodoProvider";

beforeEach(() => {
  // to fully reset the state between tests, clear the storage
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();

  // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
  localStorage.setItem.mockClear();
});

test("user can see an empty state", () => {
  render(
    <TodoProvider>
      <App />
    </TodoProvider>
  );

  const TodoList = screen.getByTestId("todo-list");
  const emptyComp = screen.getByTestId("empty-comp");
  expect(TodoList).toBeEmptyDOMElement();
  expect(emptyComp).toHaveTextContent("No Task Today ?Try to add some here");
});

test("user can set todo item to complete", async () => {
  render(
    <TodoProvider>
      <App />
    </TodoProvider>
  );

  const TodoList = screen.getByTestId("todo-list");
  const TodoForm = screen.getByPlaceholderText("Add a Task");

  expect(TodoList).toBeEmptyDOMElement();

  await act(async () => {
    fireEvent.change(TodoForm, { target: { value: "testing task" } });
    fireEvent.keyDown(TodoForm, { key: "Enter", keyCode: 13 });
    fireEvent.change(TodoForm, { target: { value: "testing task 2" } });
    fireEvent.keyDown(TodoForm, { key: "Enter", keyCode: 13 });
  });
  expect(TodoList.children.length).toBe(2);
  const todoItems = screen.getAllByTestId("todo-item");
  const checkIcons = screen.getAllByTestId("check-icon");
  expect(todoItems[0]).toHaveTextContent("testing task");

  await act(async () => {
    fireEvent.click(checkIcons[0]);
    fireEvent.click(checkIcons[1]);
  });
  const title = screen.getAllByTestId("title");
  const completedSection = screen.getByTestId("completed-section");
  expect(completedSection).toHaveTextContent("Completed (2)");
  expect(title[0]).toHaveClass("line-through");
});

test("app can add new task and reset the form after input", async () => {
  render(
    <TodoProvider>
      <App />
    </TodoProvider>
  );

  const TodoList = screen.getByTestId("todo-list");
  const TodoForm = screen.getByPlaceholderText("Add a Task");

  expect(TodoList).toBeEmptyDOMElement();

  await act(async () => {
    fireEvent.change(TodoForm, { target: { value: "testing task" } });
    fireEvent.keyDown(TodoForm, { key: "Enter", keyCode: 13 });
  });
  expect(TodoList.children.length).toBe(1);
  expect(screen.getByTestId("todo-item")).toHaveTextContent("testing task");
  expect(TodoForm.value).toBe("");
});

test("show error message when field is empty", async () => {
  render(
    <TodoProvider>
      <App />
    </TodoProvider>
  );

  const TodoList = screen.getByTestId("todo-list");
  const TodoForm = screen.getByPlaceholderText("Add a Task");
  const errorMessage = screen.getByTestId("error-message");

  expect(TodoList).toBeEmptyDOMElement();

  await act(async () => {
    fireEvent.change(TodoForm, { target: { value: "" } });
    fireEvent.keyDown(TodoForm, { key: "Enter", keyCode: 13 });
  });
  expect(TodoList.children.length).toBe(0);
  expect(errorMessage).toHaveTextContent("This field is required");

  await act(async () => {
    fireEvent.change(TodoForm, { target: { value: "some text here" } });
  });
  expect(errorMessage).toBeEmptyDOMElement();
});
