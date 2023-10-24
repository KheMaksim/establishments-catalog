import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
    rate: number;
    category: string;
}

const Rate = ({ rate, category }: Props) => {
    const [rating] = useState(rate);
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            width={"50%"}
            justifyContent={"space-between"}
        >
            <Typography variant="subtitle1" fontWeight={700}>
                {category}:
            </Typography>
            <Box display={"flex"} width={150}>
                <Rating readOnly value={rating} precision={0.1} />
                <Typography variant="subtitle1" ml={2}>
                    {rating}
                </Typography>
            </Box>
        </Box>
    );
};

export default Rate;
