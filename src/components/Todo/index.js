import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { handleDrag } from "../../helper/handleDrag";

import AddTodo from "./AddTodo";
import HeaderTodoCol from "./HeaderTodoCol";
import TodoCard from "./TodoCard";

const data = {
  todo: [
    {
      id: v4(),
      title: "Tone",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
    {
      id: v4(),
      title: "Ttwo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
  ],
  progress: [
    {
      id: v4(),
      title: "Pthree",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
    {
      id: v4(),
      title: "Pfour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
  ],
  completed: [
    {
      id: v4(),
      title: "Cfive",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
    {
      id: v4(),
      title: "Csix",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
    {
      id: v4(),
      title: "Cseven",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
    },
  ],
};
const baseTodo = {
  todo: [],
  progress: [],
  completed: [],
};

// const todoObj={
//   id:v4(),
//   type:"completed",
//   title:"Hello",
//   description:"body",
// }

function Todo() {
  const [todoList, setTodoList] = useState(baseTodo);

  const addTodo = (todoObj, setTodoList) => {
    setTodoList((prev) => {
      let data = { ...prev, [todoObj.type]: [todoObj, ...prev[todoObj.type]] };
      try {
        localStorage.setItem("todo", JSON.stringify(data));
      } catch (e) {
        console.log(e);
      }
      return data;
    });
  };

  useEffect(() => {
    setTodoList(data);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => handleDrag(result, todoList, setTodoList)}
    >
      {/* 3 col div */}
      <div className="flex space-x-6">
        {Object.entries(todoList).map(([todoType, todoItems]) => {
          // mapping all the todo types and making columns
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
                    {/* todo column heading */}
                    <HeaderTodoCol type={todoType} length={todoItems.length} />
                    {/* todo add option */}
                    <AddTodo />
                    {/* mapping items of todos */}
                    <TodoCard todoItems={todoItems} />
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
