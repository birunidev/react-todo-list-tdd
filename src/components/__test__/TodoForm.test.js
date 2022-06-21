import { screen, render } from "@testing-library/react";
import { TodoForm } from "..";

describe("Todo Form", () => {
  test("shows todo form correctly", () => {
    render(<TodoForm />);
    const inputField = screen.getByPlaceholderText("Add a Task");
    expect(inputField).toBeDefined();
  });

  test("to have value from props", () => {
    render(<TodoForm value="Task 1" onChange={() => {}} />);
    const inputField = screen.getByPlaceholderText("Add a Task");
    expect(inputField).toHaveValue("Task 1");
    expect(inputField.getAttribute("onchange")).toBeDefined();
  });

  test("to have error message below input", () => {
    render(<TodoForm error="This field is required" />);
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toHaveTextContent("This field is required");
  });
});
