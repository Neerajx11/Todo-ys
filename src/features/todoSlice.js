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
  },
});

export const { shiftTodo } = todoSlice.actions;
export default todoSlice.reducer;
