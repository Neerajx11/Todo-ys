import React from "react";
import { Draggable } from "react-beautiful-dnd";
import FooterTodo from "./FooterTodo";

const TodoCard = ({ todoItems }) => {
  return (
    <>
      {todoItems.map((item, idx) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={idx}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-4 mb-6 min-h-[50px] rounded-md shadow-sm ${
                    snapshot.isDragging ? "bg-white bg-opacity-50" : "bg-white"
                  } `}
                  style={{ ...provided.draggableProps.style }}
                  onClick={() => console.log("Hello")}
                >
                  {/* each card here */}
                  <span>{item.title}</span>
                  <div className="text-[#6B6B6B] text-xs mt-4">
                    {item.description}
                  </div>
                  <FooterTodo />
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </>
  );
};

export default TodoCard;
