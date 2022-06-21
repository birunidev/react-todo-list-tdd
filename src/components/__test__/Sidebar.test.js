import { screen, render } from "@testing-library/react";
import { Sidebar } from "..";
import { menus } from "../../constants";

test("it shows sidebar with 1 profile picture, name, email and 2 menu", () => {
  render(<Sidebar />);
  const userName = screen.getByTestId("user-name");
  const userEmail = screen.getByTestId("user-email");
  const userPicture = screen.getByTestId("user-picture");
  const menuItems = screen.getAllByTestId("menu-item");

  expect(menuItems.length).toEqual(2);

  expect(userEmail).toHaveTextContent("mmalbiruni83@gmail.com");
  expect(userName).toHaveTextContent("Muhammad Al Biruni");
  expect(userPicture).toHaveAttribute("src");
});

test("it shows correct values from menu data", () => {
  let activePage = "/";
  render(<Sidebar activePage={activePage} />);
  const menuItems = screen.getAllByTestId("menu-item");
  menuItems.forEach((menuItem, index) => {
    expect(menuItem).toHaveTextContent(menus[index].title);

    expect(menuItem.children.item(0).getAttribute("href")).toBe(
      menus[index].link
    );
    if (activePage === menus[index].link) {
      expect(menuItem.children.item(0).className).toContain(
        "bg-[#343434] border-l-4 border-[#00ABA9]"
      );
    }
  });
});
