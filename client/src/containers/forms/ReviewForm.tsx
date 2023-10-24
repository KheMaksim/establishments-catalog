import { Typography } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FormElement from "../../components/UI/formElements/FormElement";
import { useAppDispatch } from "@/hooks/hooks";
import { getReviews, postReview } from "@/features/review/ReviewActions";
import IOption from "@/interfaces/IOption";
import IReviewData from "@/interfaces/IReviewData";
import { getEstablishmentById } from "@/features/establishment/EstablishmentActions";

const rateOptions: IOption[] = [
    { id: 1, title: "1" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
    { id: 4, title: "4" },
    { id: 5, title: "5" },
];

interface Props {
    establishmentId: string;
}

const ReviewForm = ({ establishmentId }: Props) => {
    const [state, setState] = useState<IReviewData>({
        text: "",
        serviceRate: 1,
        interiorRate: 1,
        foodRate: 1,
        establishmentId,
    });

    const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const review: IReviewData = { ...state };
        dispatch(postReview(review))
            .unwrap()
            .then(() => {
                setState((prevState) => ({
                    ...prevState,
                }));
                dispatch(getReviews(Number(establishmentId)));
                dispatch(getEstablishmentById(Number(establishmentId)));
            });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    return (
        <Box
            sx={{
                width: "100%",
                borderBottom: "1px solid black",
                pb: 3,
            }}
        >
            <Typography variant="h6" fontWeight={700} textTransform="uppercase">
                Add review
            </Typography>
            <Box
                component={"form"}
                autoComplete="off"
                onSubmit={submitFormHandler}
                width={"100%"}
                alignSelf={"center"}
            >
                <Grid>
                    <FormElement
                        label="Your review text"
                        value={state.text}
                        onChange={inputChangeHandler}
                        name="text"
                    />
                </Grid>

                <Grid container alignItems={"center"}>
                    <Grid item xs mr={1}>
                        <FormElement
                            multiline
                            label="Food Quality"
                            value={state.foodRate.toString()}
                            onChange={inputChangeHandler}
                            name="foodRate"
                            select
                            options={rateOptions}
                        />
                    </Grid>

                    <Grid item xs mr={1}>
                        <FormElement
                            multiline
                            label="Service quality"
                            value={state.serviceRate.toString()}
                            onChange={inputChangeHandler}
                            name="serviceRate"
                            select
                            options={rateOptions}
                        />
                    </Grid>

                    <Grid item xs mr={1}>
                        <FormElement
                            multiline
                            label="Interior rate"
                            value={state.interiorRate.toString()}
                            onChange={inputChangeHandler}
                            name="interiorRate"
                            select
                            options={rateOptions}
                        />
                    </Grid>

                    <Grid item xs>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={state.text === ""}
                        >
                            Submit review
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ReviewForm;
