import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { shiftTodo } from "../../features/todoSlice";
import { saveTodoListToLocal } from "../../helper/localStorageHelper";

import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import HeaderTodoCol from "./HeaderTodoCol";
import TodoCard from "./TodoCard";

const todoObj = {
  id: "",
  type: "",
  title: "",
  description: "",
  madeBy: { name: "", email: "" },
};

function Todo() {
  const { todo: todoList } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
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

  const [isEditTodo, setIsEditTodo] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(todoObj);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <EditTodo
        todoObj={todoToEdit}
        isEditTodo={isEditTodo}
        setIsEditTodo={setIsEditTodo}
      />
      {/* 3 col div */}
      <div className="relative flex h-full space-x-12">
        {Object.entries(todoList).map(([todoType, todoItems]) => {
          // mapping all the todo types and making columns
          return (
            <div
              key={v4()}
              className="flex flex-col w-4/12 px-4 py-5 rounded-lg shadow-md bg-bgsecondary"
            >
              {/* todo column heading */}
              <HeaderTodoCol type={todoType} length={todoItems.length} />
              {/* todo add option */}
              <AddTodo todoType={todoType} />
              {/* mapping items of todos */}
              <Droppable droppableId={todoType}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      className="flex-1"
                      ref={provided.innerRef}
                    >
                      <TodoCard
                        setTodoToEdit={setTodoToEdit}
                        setIsEditTodo={setIsEditTodo}
                        todoItems={todoItems}
                        todoType={todoType}
                      />

                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Todo;
