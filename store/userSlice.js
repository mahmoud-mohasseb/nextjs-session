import { createSlice } from "@reduxjs/toolkit";
import { useSession, signIn, signOut } from "next-auth/react";

const initialState = {
  username: "",
  signin: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.username = action.payload;
    },
    signin: signIn,
    signout: signOut,
  },
});

// Action creators are generated for each case reducer function

export const { setName, signin, signout } = userSlice.actions;

export const selecteduserName = (state) => state.user.username;

export default userSlice.reducer;
