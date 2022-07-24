import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { handleDrag } from "../../helper/handleDrag";

import User1 from "../../assets/user1.png";
import User2 from "../../assets/user2.png";
import User3 from "../../assets/user3.png";
import User4 from "../../assets/user4.png";

import { MessageSquare } from "react-feather";

const data = {
  todo: [
    {
      id: v4(),
      title: "Tone",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
    { id: v4(), title: "Ttwo", description: "Ttwo" },
  ],
  progress: [
    { id: v4(), title: "Pthree", description: "Pthree" },
    { id: v4(), title: "Pfour", description: "Pfour" },
  ],
  completed: [
    { id: v4(), title: "Cfive", description: "Cfive" },
    { id: v4(), title: "Csix", description: "Csix" },
    { id: v4(), title: "Cseven", description: "Cseven" },
  ],
};
const base = {
  todo: [],
  progress: [],
  completed: [],
};

const nameMap = {
  todo: "To Do",
  progress: "In Progress",
  completed: "Completed",
};

function Todo() {
  const [todoList, setTodoList] = useState(base);
  const profArr = [User1, User2, User3, User4];

  useEffect(() => {
    setTodoList(data);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => handleDrag(result, todoList, setTodoList)}
    >
      {/* 3 col div */}
      <div className="flex space-x-4">
        {Object.entries(todoList).map(([todoType, todoItems]) => {
          return (
            <Droppable droppableId={todoType} key={v4()}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${
                      snapshot.isDraggingOver
                        ? "bg-bgsecondary bg-opacity-95"
                        : "bg-bgsecondary"
                    } px-4 py-5 w-4/12 min-h-[500px] rounded-lg `}
                  >
                    {/* todo col heading */}
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-icon">{nameMap[todoType]}</span>
                      <span className="text-primary bg-bgprimary rounded-lg px-2 py-1">
                        {todoItems.length}
                      </span>
                    </div>
                    {/* todo add option */}
                    <div className="text-primary cursor-pointer bg-bgprimary text-center text-base py-1 rounded-lg my-4 hover:bg-[#DEF0F0]">
                      +
                    </div>
                    {/* mapping items of todos */}
                    {todoItems.map((item, idx) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={idx}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-4 mb-6 min-h-[50px] rounded-md shadow-sm ${
                                  snapshot.isDragging
                                    ? "bg-white bg-opacity-50"
                                    : "bg-white"
                                } `}
                                style={{ ...provided.draggableProps.style }}
                                onClick={() => console.log("Hello")}
                              >
                                {/* each card here */}
                                <span>{item.title}</span>
                                <div className="text-[#6B6B6B] text-xs mt-4">
                                  {item.description}
                                </div>
                                <div className="flex justify-between mt-5">
                                  <img
                                    src={profArr[Math.floor(Math.random() * 4)]}
                                    className="w-6 h-6"
                                    alt="default user"
                                  />
                                  <div className="flex items-center text-gray-400">
                                    <span className="mr-1 text-[12px]">
                                      {Math.floor(Math.random() * 3)}
                                    </span>
                                    <MessageSquare
                                      strokeWidth={1}
                                      className="w-4 h-4"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Todo;
