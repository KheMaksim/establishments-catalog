import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IResponseValidateError from "@/interfaces/IResponseValidateError";
import IReview from "@/interfaces/IReview";
import { getReviews, postReview, removeReview } from "./ReviewActions";

interface ReviewState {
    reviews: IReview[];
    error: null | string | IResponseValidateError;
    isLoading: boolean;
}

export const initialState: ReviewState = {
    reviews: [],
    error: null,
    isLoading: false,
};

const ReviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<IReview[]>) => {
            state.reviews = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload;
                state.error = null;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(postReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postReview.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(postReview.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(removeReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeReview.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeReview.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            });
    },
});

export const { setReviews } = ReviewSlice.actions;

export const ReviewReducer = ReviewSlice.reducer;
