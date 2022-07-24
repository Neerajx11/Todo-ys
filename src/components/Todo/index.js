import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { handleDrag } from "../../helper/handleDrag";

const data = {
  todo: [
    { id: v4(), title: "Tone", description: "Tone" },
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

function Todo() {
  const [todoList, setTodoList] = useState(base);

  useEffect(() => {
    setTodoList(data);
  }, []);

  return (
    <div className="flex justify-center h-full">
      <DragDropContext
        onDragEnd={(result) => handleDrag(result, todoList, setTodoList)}
      >
        {/* 3 col div */}
        {Object.entries(todoList).map(([todoType, todoItems]) => {
          return (
            <Droppable droppableId={todoType} key={v4()}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${
                      snapshot.isDraggingOver ? "bg-blue-300" : "bg-blue-800"
                    } p-4 w-4/12 mx-4 min-h-[500px]`}
                  >
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
                                className={`p-16 mb-6 min-h-[50px] ${
                                  snapshot.isDragging
                                    ? "bg-orange-400"
                                    : "bg-pink-500"
                                } text-white`}
                                style={{ ...provided.draggableProps.style }}
                                onClick={() => console.log("Hello")}
                              >
                                <span>{item.title}</span>
                                <div>{item.description}</div>
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
      </DragDropContext>
    </div>
  );
}

export default Todo;
