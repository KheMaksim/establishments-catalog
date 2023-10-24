import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { RootState } from "@/store/store";
import { AxiosError, isAxiosError } from "axios";
import IResponseError from "@/interfaces/IResponseError";
import { IEstablishment } from "@/interfaces/IEstablishment";
import { setEstablishment, setEstablishments } from "./EstablishmentSlice";

export const getEstablishments = createAsyncThunk<IEstablishment[]>(
    "get/establishments",
    async (_payload, thunkAPI) => {
        const { data: establishmentsResponse } = await api.get<
            IEstablishment[]
        >("/establishments");
        await thunkAPI.dispatch(setEstablishments(establishmentsResponse));
        return establishmentsResponse;
    }
);

export const getEstablishmentById = createAsyncThunk<IEstablishment, number>(
    "get/establishmentsById",
    async (payload, thunkAPI) => {
        const { data: establishmentsResponse } = await api.get<IEstablishment>(
            "/establishments/" + payload
        );
        thunkAPI.dispatch(setEstablishment(establishmentsResponse));
        return establishmentsResponse;
    }
);

export const postEstablishment = createAsyncThunk<
    IEstablishment,
    FormData,
    { rejectValue: IResponseError }
>("post/establishment", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: establishmentsResponse } = await api
            .post<IEstablishment>("/establishments", payload, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return establishmentsResponse;
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

export const removeEstablishment = createAsyncThunk<void, number>(
    "delete/establishment",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            await api.delete("/establishments/delete/" + payload, {
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
