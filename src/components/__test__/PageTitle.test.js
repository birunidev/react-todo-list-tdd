import { screen, render } from "@testing-library/react";
import { PageTitle } from "..";
import { formatDate } from "../../utils";

test("shows page title and date", () => {
  let today = new Date();
  render(<PageTitle title="My Daily Task" date={today} />);

  const pageTitle = screen.getByTestId("page-title");
  const date = screen.getByTestId("date");

  expect(pageTitle).toHaveTextContent("My Daily Task");
  expect(date).toHaveTextContent(formatDate(today));
});
