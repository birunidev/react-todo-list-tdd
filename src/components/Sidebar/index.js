import React from "react";
import MenuItems from "./MenuItems";

export default function Sidebar({ activePage }) {
  return (
    <div className="sidebar bg-[#212121] max-w-[320px] w-full h-[100vh] fixed top-0 left-0">
      <div className="profile-wrapper px-5 py-10 flex justify-between">
        <div className="mr-4">
          <img
            src="https://ui-avatars.com/api/?name=Muhammad Al Biruni&background=00ABA9&color=fff&font-size=0.4"
            className="w-full rounded-full"
            data-testid="user-picture"
            alt=""
          />
        </div>
        <div className="w-[70%] mt-2">
          <p className="text-md font-medium text-white" data-testid="user-name">
            Muhammad Al Biruni
          </p>
          <p className="text-sm text-white" data-testid="user-email">
            mmalbiruni83@gmail.com
          </p>
        </div>
      </div>
      <MenuItems activePage={activePage} />
    </div>
  );
}
