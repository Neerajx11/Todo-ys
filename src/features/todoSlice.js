import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initalState = {
  todo: [
    {
      id: v4(),
      title: "Tone",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
    {
      id: v4(),
      title: "Ttwo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
  ],
  progress: [
    {
      id: v4(),
      title: "Pthree",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
    {
      id: v4(),
      title: "Pfour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
  ],
  completed: [
    {
      id: v4(),
      title: "Cfive",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
    {
      id: v4(),
      title: "Csix",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
    {
      id: v4(),
      title: "Cseven",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem natus dolores optio",
      madeBy: {
        name: "Some Name",
        email: "some@g.com",
      },
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initalState,
  reducers: {
    //*** update if todo moves within the todo column type
    updateTodoPosition: (state, action) => {
      const [item] = state.splice(action.sourceIdx, 1);
      state.splice(action.destinationIdx, 0, item);
      return state;
    },
    //*** update if todo moves into over another column
    shiftTodoToDiffCol: (state, action) => {
      const [item] = state.splice(action.sourceIdx, 1);
      state.splice(action.destinationIdx, 0, item);
      return state;
    },
  },
});

export const { updateTodoPosition, shiftTodoToDiffCol } = todoSlice.actions;
export default todoSlice.reducer;
