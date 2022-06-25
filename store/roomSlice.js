import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setvalue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { setvalue } = roomSlice.actions;

export const selecteduserName = (state) => state.room.username;

export default roomSlice.reducer;
