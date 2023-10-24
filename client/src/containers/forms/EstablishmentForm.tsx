import Wrapper from "@/components/wrapper/Wrapper";
import {
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FileInput from "../../components/UI/formElements/FileInput";
import FormElement from "../../components/UI/formElements/FormElement";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { postEstablishment } from "@/features/establishment/EstablishmentActions";

interface State {
    name: string;
    description: string;
    image: string;
    checked: boolean;
}

const EstablishmentForm = () => {
    const [state, setState] = useState<State>({
        name: "",
        description: "",
        image: "",
        checked: false,
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });
        dispatch(postEstablishment(formData))
            .unwrap()
            .then(() => navigate("/"));
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            if (name === "checked")
                return { ...prevState, [name]: !prevState.checked };
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files ? e.target.files[0] : "";
        setState((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    return (
        <Container>
            <Wrapper>
                <Typography
                    variant="h4"
                    textAlign="center"
                    textTransform="uppercase"
                >
                    Add new place
                </Typography>
                <Box
                    component={"form"}
                    autoComplete="off"
                    onSubmit={submitFormHandler}
                    paddingY={2}
                    width={"100%"}
                    maxWidth={900}
                    alignSelf={"center"}
                >
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <FormElement
                                required
                                label="Title"
                                value={state.name}
                                onChange={inputChangeHandler}
                                name="name"
                            />
                        </Grid>

                        <Grid item xs>
                            <FormElement
                                required
                                label="Description"
                                value={state.description}
                                onChange={inputChangeHandler}
                                name="description"
                            />
                        </Grid>

                        <Grid item xs>
                            <FileInput
                                label="Main photo"
                                onChange={fileChangeHandler}
                                name="image"
                            />
                        </Grid>

                        <Grid item xs>
                            <FormGroup>
                                <FormControlLabel
                                    label="I have read and agree to the Terms of Service and Privacy Policy. "
                                    required
                                    control={
                                        <Checkbox
                                            name="checked"
                                            checked={state.checked}
                                            onChange={inputChangeHandler}
                                        />
                                    }
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs>
                            <Button
                                disabled={
                                    state.name === "" ||
                                    state.description === "" ||
                                    state.image === "" ||
                                    state.image === undefined ||
                                    state.checked === false
                                }
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Wrapper>
        </Container>
    );
};

export default EstablishmentForm;
