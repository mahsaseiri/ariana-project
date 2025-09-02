import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Auth state interface
interface AuthState {
  token: string | null;
  loggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  token: null,
  loggedIn: false,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login reducer - stores token and sets loggedIn to true
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.loggedIn = true;
    },

    // Reset reducer - clears all auth data
    logout: (state) => {
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
