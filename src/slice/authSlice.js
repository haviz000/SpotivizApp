import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    isAuth: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;

      localStorage.setItem('accessToken', state.accessToken);
      localStorage.setItem('expiredDate', action.payload.expiredDate);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state, _) => {
      state.accessToken = '';
      state.isAuthorized = false;
      state.user = {};

      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiredDate');
      localStorage.removeItem('user');
    },
  }
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
    