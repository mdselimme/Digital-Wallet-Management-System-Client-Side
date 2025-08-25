import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
    isAuthenticate: boolean;
    role: "Admin" | "Super_Admin" | "User" | "Agent" | null;
}

const initialState: IAuthState = {
    isAuthenticate: false,
    role: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ role: IAuthState["role"] }>) => {
            console.log(action.payload)
            state.isAuthenticate = true;
            state.role = action.payload.role
        },
        logout: (state) => {
            state.isAuthenticate = false;
            state.role = null
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;