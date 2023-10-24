import { Button, Grid, TextField, styled } from "@mui/material";
import { useRef, ChangeEvent, useState } from "react";

const HiddenInputFile = styled(`input`)({
    display: "none",
});

interface FileInputProps {
    label: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ label, name, onChange }: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState("");

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
        if (typeof onChange === "function") onChange(e);
    };

    const activeInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <HiddenInputFile
                ref={inputRef}
                name={name}
                type="file"
                onChange={onFileChange}
            />
            <Grid container direction={"row"} spacing={2} alignItems={"center"}>
                <Grid item xs>
                    <TextField
                        margin="normal"
                        disabled
                        required
                        variant="outlined"
                        fullWidth
                        label={label}
                        value={fileName}
                        onClick={activeInput}
                    />
                </Grid>
                <Grid item xs>
                    <Button variant="contained" onClick={activeInput}>
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;
