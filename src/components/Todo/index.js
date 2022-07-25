import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { shiftTodo } from "../../features/todoSlice";
import { saveTodoListToLocal } from "../../helper/localStorageHelper";

import AddTodo from "./AddTodo";
import HeaderTodoCol from "./HeaderTodoCol";
import TodoCard from "./TodoCard";

function Todo() {
  const { todo: todoList } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Save to local");
    saveTodoListToLocal(todoList);
  }, [todoList]);

  const onDragEnd = (result) => {
    //*** no updates if the todo not dropped in any todo column type
    if (!result.destination) return;

    const { source, destination } = result;
    //*** no updates if the todo come back to same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // creating payload to shiftTodo
    const payload = {
      sourceIdx: source.index,
      destinationIdx: destination.index,
      sourceType: source.droppableId,
      destinationType: destination.droppableId,
    };

    //***  move todo in our state
    dispatch(shiftTodo(payload));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
