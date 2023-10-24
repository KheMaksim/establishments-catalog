import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { RootState } from "@/store/store";
import { AxiosError, isAxiosError } from "axios";
import IResponseError from "@/interfaces/IResponseError";
import IPicture from "@/interfaces/IPicture";
import { setPictures } from "./PictureSlice";

export const getPictures = createAsyncThunk<IPicture[], number>(
    "get/pictures",
    async (payload, thunkAPI) => {
        const { data: picturesResponse } = await api
            .get<IPicture[]>("/pictures/" + payload)
            .then((res) => res);
        await thunkAPI.dispatch(setPictures(picturesResponse));
        return picturesResponse;
    }
);

export const postPicture = createAsyncThunk<
    IPicture,
    FormData,
    { rejectValue: IResponseError }
>("post/pictures", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: picturesResponse } = await api
            .post<IPicture>("/pictures", payload, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return picturesResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const removePicture = createAsyncThunk<void, number>(
    "delete/picture",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            await api.delete("/pictures/delete/" + payload, {
                headers: {
                    Authorization: token,
                },
            });
            return;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<IResponseError> = err;
                return thunkAPI.rejectWithValue(
                    error.response?.data.error.message ||
                        "Something went wrong."
                );
            }
            throw err;
        }
    }
);
