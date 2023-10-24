import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IResponseValidateError from "@/interfaces/IResponseValidateError";
import { IEstablishment } from "@/interfaces/IEstablishment";
import {
    getEstablishmentById,
    getEstablishments,
    postEstablishment,
    removeEstablishment,
} from "./EstablishmentActions";

interface EstablishmentState {
    establishments: IEstablishment[];
    establishment: IEstablishment | null;
    error: null | string | IResponseValidateError;
    isLoading: boolean;
}

export const initialState: EstablishmentState = {
    establishments: [],
    establishment: null,
    error: null,
    isLoading: false,
};

const EstablishmentSlice = createSlice({
    name: "establishment",
    initialState,
    reducers: {
        setEstablishment: (state, action: PayloadAction<IEstablishment>) => {
            state.establishment = action.payload;
        },
        setEstablishments: (state, action: PayloadAction<IEstablishment[]>) => {
            state.establishments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEstablishments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getEstablishments.fulfilled, (state, action) => {
                state.establishments = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getEstablishments.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(getEstablishmentById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getEstablishmentById.fulfilled, (state, action) => {
                state.establishment = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getEstablishmentById.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(postEstablishment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postEstablishment.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(postEstablishment.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            })

            .addCase(removeEstablishment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeEstablishment.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeEstablishment.rejected, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(action.payload)) {
                    state.error = action.payload;
                } else {
                    state.error = "Error occurred";
                }
            });
    },
});

export const { setEstablishment, setEstablishments } =
    EstablishmentSlice.actions;

export const EstablishmentReducer = EstablishmentSlice.reducer;
