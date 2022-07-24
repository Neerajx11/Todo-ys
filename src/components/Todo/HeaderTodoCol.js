import React from "react";

const nameMap = {
  todo: "To Do",
  progress: "In Progress",
  completed: "Completed",
};

const HeaderTodoCol = ({ type, length }) => {
  return (
    <div className="flex justify-between text-sm font-medium">
      <span className="text-icon">{nameMap[type]}</span>
      <span className="text-primary bg-bgprimary rounded-lg px-2 py-1">
        {length}
      </span>
    </div>
  );
};

export default HeaderTodoCol;
