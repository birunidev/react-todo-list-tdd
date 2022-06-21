import { screen, render } from "@testing-library/react";
import TodoItem from "../TodoList/TodoItem";

test("show todo item title correctly", () => {
  render(<TodoItem title="Start a coding interview" isCompleted={false} />);
  const todoTitle = screen.getByTestId("title");
  const checkIcon = screen.getByTestId("check-icon");
  const updateBtn = screen.getByTestId("update-btn");
  const removeBtn = screen.getByTestId("remove-btn");
  expect(checkIcon).toBeEmptyDOMElement();
  expect(todoTitle).toHaveTextContent("Start a coding interview");
  expect(updateBtn).toBeInTheDocument();
  expect(removeBtn).toBeInTheDocument();
  expect(todoTitle.className).toBe("");
});

test("show checklist icon and strikethrough the title when is completed", () => {
  render(<TodoItem isCompleted={true} title="Start a coding interview" />);

  const todoTitle = screen.getByTestId("title");
  const checkIcon = screen.getByTestId("check-icon");
  expect(checkIcon).toContainHTML("svg");
  expect(checkIcon).toHaveClass("bg-white");
  expect(todoTitle).toHaveClass("line-through");
});
