import React from "react";
import User4 from "../../assets/user4.png";
import { MessageSquare } from "react-feather";

const FooterTodo = () => {
  return (
    <div className="flex justify-between mt-5">
      <img src={User4} className="w-6 h-6" alt="default user" />
      <div className="flex items-center text-gray-400">
        <span className="mr-1 text-[12px]">
          {Math.floor(Math.random() * 3)}
        </span>
        <MessageSquare strokeWidth={1} className="w-4 h-4" />
      </div>
    </div>
  );
};

export default React.memo(FooterTodo);
