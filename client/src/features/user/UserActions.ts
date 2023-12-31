import api from "@/api/api";
import { IUser } from "@/interfaces/IUser";
import userRequest from "@/interfaces/IUserRequest";
import IResponseError from "@/interfaces/IResponseError";
import IResponseValidateError from "@/interfaces/IResponseValidateError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import { RootState } from "@/store/store";

export const registerUser = createAsyncThunk<
    IUser,
    userRequest,
    { rejectValue: IResponseError | IResponseValidateError }
>("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post<IUser>("/users", userData);
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const loginUser = createAsyncThunk<
    IUser,
    userRequest,
    { rejectValue: string }
>("auth.login", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post<IUser>("/users/sessions", userData);
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return rejectWithValue(
                error.response?.data.error.message || "Something went wrong."
            );
        }
        throw err;
    }
});

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            const response = await api.delete("/users/logout", {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<IResponseError> = err;
                return thunkAPI.rejectWithValue(
                    error.response?.data.error.message ||
                        "Internet connection error"
                );
            }
            throw err;
        }
    }
);
