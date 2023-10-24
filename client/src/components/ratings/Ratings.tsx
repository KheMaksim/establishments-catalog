import { Box, Typography } from "@mui/material";
import Rate from "./Rate";

interface Props {
    foodRate: number;
    serviceRate: number;
    interiorRate: number;
}

const Ratings = ({ foodRate, serviceRate, interiorRate }: Props) => {
    const overallRate = () => {
        const overall = ((foodRate + serviceRate + interiorRate) / 3).toFixed(
            1
        );
        return Number(overall);
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid black",
                pb: 3,
                mb: 2,
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                textTransform="uppercase"
                mb={1}
            >
                Ratings
            </Typography>

            <Rate rate={overallRate()} category="Overall" />
            <Rate rate={foodRate} category="Quality of food" />
            <Rate rate={serviceRate} category="Service quality" />
            <Rate rate={interiorRate} category="Interior rate" />
        </Box>
    );
};

export default Ratings;
