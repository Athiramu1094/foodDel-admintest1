import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userLoggedIn: false,
    user_id: null,
  },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload.userLoggedIn;
      state.user_id = action.payload.user_id;
    },
  },
});

// Ensure you are exporting it like this:
export const { setUserLoggedIn } = loginSlice.actions; // Correct export
export default loginSlice.reducer; // Also exporting the reducer
