import React from "react";
import {
  BarChart2,
  Calendar,
  Folder,
  Home,
  LogOut,
  MessageSquare,
  Settings,
} from "react-feather";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { clearUserFromLocalStorage } from "../../helper/localStorageHelper";

const SideNav = () => {
  const liClass =
    "flex hover:text-gray-700  cursor-pointer text-base items-center pl-8 pr-24 hover:bg-gray-100 py-4";
  const iconClass = "w-4 h-4 mr-8";

  const dispatch = useDispatch();

  const logoutHandler = () => {
    clearUserFromLocalStorage();
    dispatch(logout());
  };

  return (
    <nav className="shadow-lg pt-4 pb-12 h-screen w-max">
      {/* logo */}
      <div className="text-[#161616] font-medium text-xl pl-8 pr-24 h-[7%]">
        .taskez
      </div>
      {/* menu icons */}
      <div className="list-none flex flex-col text-gray-400 h-[38%]">
        <li className={liClass}>
          <Home className={iconClass} />
          <span>Overview</span>
        </li>
        <li className={liClass}>
          <BarChart2 className={iconClass} />
          <span>Stats</span>
        </li>
        <li
          className={`${liClass} font-medium text-gray-700 bg-gray-100 relative before:absolute before:h-full before:right-0 before:bg-primary before:w-[4px] before:rounded-l`}
        >
          <Folder className={`${iconClass}`} strokeWidth={3} />
          <span>Projects</span>
        </li>
        <li className={liClass}>
          <MessageSquare className={iconClass} />
          <span>Chat</span>
        </li>
        <li className={liClass}>
          <Calendar className={iconClass} />
          <span>Calender</span>
        </li>
      </div>
      <div className="h-[40%]"></div>
      {/* setting and logout */}
      <div className="list-none text-gray-400 h-[15%]">
        <li className={liClass}>
          <Settings className={iconClass} />
          <span>Setting</span>
        </li>
        <li className={liClass} onClick={logoutHandler}>
          <LogOut className={iconClass} />
          <span>Log Out</span>
        </li>
      </div>
    </nav>
  );
};

export default SideNav;
