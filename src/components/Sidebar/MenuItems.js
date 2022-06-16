import React from "react";
import { menus } from "../../constants";

const MenuItem = ({ title, link, activePage }) => {
  return (
    <li data-testid="menu-item" className="menu-item">
      <a
        href={link}
        className={[
          "py-4 px-6 bg-[#212121]  w-full block text-white",
          activePage && "bg-[#343434] border-l-4 border-[#00ABA9]",
        ].join(" ")}
      >
        {title}
      </a>
    </li>
  );
};

export default function MenuItems({ activePage }) {
  return (
    <div className="menu-items">
      <ul>
        {menus.map((menu, index) => {
          return (
            <MenuItem
              key={index}
              activePage={activePage === menu.link}
              title={menu.title}
              link={menu.link}
            />
          );
        })}
      </ul>
    </div>
  );
}
