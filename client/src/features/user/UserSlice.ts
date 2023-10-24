import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { loginUser, logoutUser, registerUser } from "./UserActions";
import IUserResponseValidateError from "@/interfaces/IResponseValidateError";

export interface UserState {
    userInfo: IUser | null;
    registerError: null | string | IUserResponseValidateError;
    loginError: null | string;
}

const initialState: UserState = {
    userInfo: null,
    registerError: null,
    loginError: null,
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = { ...action.payload };
                state.registerError = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.registerError = action.payload;
                } else {
                    state.registerError =
                        action.payload?.error.message ?? "Error occurred";
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginError = null;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginError = action.payload || null;
            })
            .addCase(logoutUser.fulfilled, () => {
                return initialState;
            })
            .addCase(logoutUser.rejected, () => {
                return initialState;
            });
    },
});

export const UserReducer = UserSlice.reducer;
