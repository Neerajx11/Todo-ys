import React from "react";
import { Filter } from "react-feather";

import Todo from "../Todo";
import Header from "./Header";
import SideNav from "./SideNav";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideNav />
      </div>
      <div className="flex flex-col w-full px-8 ml-[250px] pb-6">
        <div className="w-full">
          {/* header */}
          <Header />
        </div>
        {/* Todo section */}
        <div className="flex flex-col">
          {/* todo title */}
          <div className="flex justify-between pt-4 mb-6 tracking-wide">
            <span className="text-2xl font-medium">Project</span>
            <div className="flex items-center text-icon">
              <Filter className="w-4 h-4 mr-1" />
              <span>Filter</span>
            </div>
          </div>
          {/* todo groups */}
          <div className="flex-1 min-h-[calc(100vh_-_180px)]">
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
