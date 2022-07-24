export const handleDrag = (result, todoList, setTodoList) => {
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

  //*** update if items move within the todo column type
  if (source.droppableId === destination.droppableId) {
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
