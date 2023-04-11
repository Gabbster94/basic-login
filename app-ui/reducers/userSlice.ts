import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  token: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInAction: (state, action: PayloadAction<any>) => {
      const { email, name, token } = action.payload;

      state.token = token;
      state.email = email;
      state.name = name;
    },
    logoutAction: (state) => { }
  }
});

export const { logInAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;