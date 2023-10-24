import { Box, Button, Typography } from "@mui/material";
import Rate from "../ratings/Rate";
import { MouseEventHandler } from "react";

interface Props {
    text: string;
    datetime: string;
    user: string;
    serviceRate: number;
    interiorRate: number;
    foodRate: number;
    allowDelete: boolean;
    removeHandler?: MouseEventHandler<HTMLButtonElement>;
}

const Review = ({
    text,
    datetime,
    user,
    serviceRate,
    interiorRate,
    foodRate,
    allowDelete,
    removeHandler,
}: Props) => {
    const timeConvert = (date: string) => {
        const newDate = new Date(date);
        const formattedDate =
            (newDate.getDate() < 10
                ? `0${newDate.getDate()}`
                : `${newDate.getDate()}`) +
            "." +
            (newDate.getMonth() + 1 < 9
                ? `0${newDate.getMonth() + 1}`
                : `${newDate.getMonth() + 1}`) +
            `.${newDate.getFullYear()} ` +
            (newDate.getHours() < 10
                ? `0${newDate.getHours()}:`
                : `${newDate.getHours()}:`) +
            (newDate.getMinutes() < 10
                ? `0${newDate.getMinutes()}`
                : `${newDate.getMinutes()}`);
        return formattedDate;
    };

    return (
        <Box
            sx={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 3,
                position: "relative",
                p: 2,
                mb: 2,
            }}
        >
            <Typography variant="subtitle1" mb={3}>
                <Typography
                    component={"span"}
                    variant="subtitle1"
                    fontWeight={700}
                >
                    {user}
                </Typography>{" "}
                said:
            </Typography>

            <Typography variant="subtitle1" mb={4}>
                {text}
            </Typography>

            <Rate rate={foodRate} category="Quality of food" />
            <Rate rate={serviceRate} category="Service quality" />
            <Rate rate={interiorRate} category="Interior rate" />

            <Typography variant="subtitle1" textAlign={"end"}>
                {timeConvert(datetime)}
            </Typography>

            {allowDelete ? (
                <Button
                    size="small"
                    onClick={removeHandler}
                    variant={"text"}
                    color="error"
                    sx={{
                        minWidth: 35,
                        position: "absolute",
                        top: 20,
                        right: 20,
                    }}
                >
                    X
                </Button>
            ) : null}
        </Box>
    );
};

export default Review;
