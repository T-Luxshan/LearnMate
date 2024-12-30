import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for click count
const clickCountSlice = createSlice({
  name: "clickCount",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

// Export the actions and reducer
export const { increment } = clickCountSlice.actions;
const store = configureStore({
  reducer: {
    clickCount: clickCountSlice.reducer,
  },
});

export default store;
