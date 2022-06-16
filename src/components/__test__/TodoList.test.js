import { screen, render } from "@testing-library/react";
import { TodoList } from "..";
import { todos } from "../../constants";
test("show todo list correctly", () => {
  render(<TodoList data={todos} />);

  const todoItems = screen.getAllByTestId("todo-item");
  const checkIcons = screen.getAllByTestId("check-icon");
  expect(todoItems.length).toEqual(todos.length);
  todoItems.forEach((todoItem, index) => {
    expect(todoItem).toHaveTextContent(todos[index].title);
    if (todos[index].isCompleted) {
      expect(checkIcons[index]).toContainHTML("svg");
    } else {
      expect(checkIcons[index]).toBeEmptyDOMElement();
    }
  });
});
