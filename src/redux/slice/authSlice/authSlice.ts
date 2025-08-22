import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
    isAuthenticated: boolean;
    role: "Admin" | "Super_Admin" | "User" | "Agent" | null;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    role: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ role: IAuthState["role"] }>) => {
            state.isAuthenticated = true;
            state.role = action.payload.role
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = null
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.actions;