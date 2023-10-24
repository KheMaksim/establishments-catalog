import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { RootState } from "@/store/store";
import { AxiosError, isAxiosError } from "axios";
import IResponseError from "@/interfaces/IResponseError";
import IReview from "@/interfaces/IReview";
import { setReviews } from "./ReviewSlice";
import IReviewData from "@/interfaces/IReviewData";

export const getReviews = createAsyncThunk<IReview[], number>(
    "get/reviews",
    async (payload, thunkAPI) => {
        const { data: reviewsResponse } = await api
            .get<IReview[]>("/reviews/" + payload)
            .then((res) => res);
        await thunkAPI.dispatch(setReviews(reviewsResponse));
        return reviewsResponse;
    }
);

export const postReview = createAsyncThunk<
    IReview,
    IReviewData,
    { rejectValue: IResponseError }
>("post/review", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: reviewsResponse } = await api
            .post<IReview>("/reviews", payload, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return reviewsResponse;
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

export const removeReview = createAsyncThunk<void, number>(
    "delete/review",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            await api.delete("/reviews/delete/" + payload, {
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
