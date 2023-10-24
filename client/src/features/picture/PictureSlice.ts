import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IResponseValidateError from "@/interfaces/IResponseValidateError";
import IPicture from "@/interfaces/IPicture";
import { getPictures, postPicture, removePicture } from "./PictureActions";

interface PictureState {
    pictures: IPicture[];
    error: null | string | IResponseValidateError;
    isLoading: boolean;
}

export const initialState: PictureState = {
    pictures: [],
    error: null,
    isLoading: false,
};

const PictureSlice = createSlice({
    name: "picture",
    initialState,
    reducers: {
        setPictures: (state, action: PayloadAction<IPicture[]>) => {
            state.pictures = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPictures.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPictures.fulfilled, (state, action) => {
                state.pictures = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getPictures.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(postPicture.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postPicture.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(postPicture.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(removePicture.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removePicture.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removePicture.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            });
    },
});

export const { setPictures } = PictureSlice.actions;

export const PictureReducer = PictureSlice.reducer;
