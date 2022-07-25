import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  todo: [],
  progress: [],
  completed: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initalState,
  reducers: {
    shiftTodo: (state, { payload }) => {
      const [item] = state[payload.sourceType].splice(payload.sourceIdx, 1);
      state[payload.destinationType].splice(payload.destinationIdx, 0, item);
    },
    // payload :  todoObj, todoType
    editTodo: (state, { payload }) => {
      const item = state[payload.todoType].find(
        (el) => el.id === payload.todoObj.id
      );
      if (item) state[payload.todoType].splice(item, 1, payload.todoObj);
    },
    // payload {todoType, id}
    deleteTodo: (state, { payload }) => {
      const item = state[payload.todoType].find((el) => el.id === payload.id);
      if (item) state[payload.todoType].splice(item, 1);
    },
  },
});

export const { shiftTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
