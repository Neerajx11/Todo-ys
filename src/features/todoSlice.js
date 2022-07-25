import { createSlice, current } from "@reduxjs/toolkit";

const initalState = {
  todo: [],
  progress: [],
  completed: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initalState,
  reducers: {
    // payload :  todoObj, todoType
    addTodo: (state, { payload }) => {
      state[payload.todoType].splice(0, 0, payload.todoObj);
    },
    shiftTodo: (state, { payload }) => {
      const [item] = state[payload.sourceType].splice(payload.sourceIdx, 1);
      state[payload.destinationType].splice(payload.destinationIdx, 0, item);
    },
    // payload :  todoObj, todoType
    editTodo: (state, { payload }) => {
      const item = state[payload.todoType].findIndex(
        (el) => el.id === payload.todoObj.id
      );
      state[payload.todoType].splice(item, 1, payload.todoObj);
    },
    // payload {todoType, id}
    deleteTodo: (state, { payload }) => {
      const item = state[payload.todoType].findIndex(
        (el) => el.id === payload.id
      );
      state[payload.todoType].splice(item, 1);
    },
  },
});

export const { addTodo, shiftTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
