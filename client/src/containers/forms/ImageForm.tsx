import { ChangeEvent, FormEvent, useState } from "react";
import FileInput from "../../components/UI/formElements/FileInput";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/hooks/hooks";
import { getPictures, postPicture } from "@/features/picture/PictureActions";

interface Props {
    establishmentId: string;
}

const ImageForm = ({ establishmentId }: Props) => {
    const [state, setState] = useState({
        image: "",
        establishmentId,
    });

    const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });
        dispatch(postPicture(formData))
            .unwrap()
            .then(() => {
                setState((prevState) => ({
                    ...prevState,
                    image: "",
                }));
                dispatch(getPictures(Number(establishmentId)));
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
        <Box
            component={"form"}
            autoComplete="off"
            onSubmit={submitFormHandler}
            paddingY={2}
            width={"100%"}
            alignSelf={"center"}
        >
            <Typography variant="h6" fontWeight={700} textTransform="uppercase">
                Upload new photo
            </Typography>
            <FileInput
                label="Main photo"
                onChange={fileChangeHandler}
                name="image"
            />
            <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={state.image === "" || state.image === undefined}
                sx={{
                    mt: 1,
                }}
            >
                Create
            </Button>
        </Box>
    );
};

export default ImageForm;
