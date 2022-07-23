import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";

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

function App() {
  const [todoList, setTodoList] = useState(base);

  useEffect(() => {
    setTodoList(data);
  }, []);

  const onDragEnd = (result) => {
    //*** no updates if the todo not dropped in any todo column type
    if (!result.destination) return;
    console.log(result);

    const { source, destination } = result;

    //*** no updates if the todo come back to same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    //*** update if items move within the todo column type
    if (source.droppableId === destination.droppableId) {
      console.log("ran");
      // create a copy of the list
      let itemList = [...todoList[source.droppableId]];

      // create the copy of element that should be moved
      const itemToMove = itemList.splice(source.index, 1);

      // changing the index of moving item
      // splice returns an array so accessing the remove item with itemToMove[0]
      itemList.splice(destination.index, 0, itemToMove[0]);

      //change our state to reflect changes
      setTodoList((prev) => ({
        ...prev,
        [source.droppableId]: itemList,
      }));
    }

    //*** update if item is move over another column
    if (source.droppableId !== destination.droppableId) {
      // copy of source and destination todo column list
      const sourceList = [...todoList[source.droppableId]];
      const destinationList = [...todoList[destination.droppableId]];
      const removedItem = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removedItem[0]);

      setTodoList((prev) => ({
        ...prev,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));
    }
  };

  return (
    <div className="flex justify-center h-full">
      <DragDropContext onDragEnd={onDragEnd}>
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

export default App;
