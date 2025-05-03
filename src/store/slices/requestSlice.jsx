import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (atate, action) => action.payload,
    removeRequest: (state, action) => {
      const newState = state.filter((item) => item._id !== action.payload);
      return newState;
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
