import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  hasLogin: boolean;
}

const initialState: AuthState = {
  hasLogin: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStateAction: (state, action: PayloadAction<boolean>) => {
      state.hasLogin = action.payload;
    }
  }
});

export const { setLoginStateAction } = authSlice.actions;

export default authSlice.reducer;