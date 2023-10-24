import { Box, Typography } from "@mui/material";
import Review from "./Review";
import IReview from "@/interfaces/IReview";

interface Props {
    reviews: IReview[];
    allowDelete: boolean;
    removeHandler: (reviewId: number) => void;
}

const Reviews = ({ reviews, allowDelete, removeHandler }: Props) => {
    return (
        <Box
            sx={{
                width: "100%",
                borderBottom: "1px solid black",
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                textTransform="uppercase"
                mb={3}
            >
                Reviews
            </Typography>
            {reviews.map((review, index) => (
                <Review
                    text={review.text}
                    datetime={review.datetime}
                    user={review.user.username}
                    serviceRate={review.serviceRate}
                    interiorRate={review.interiorRate}
                    foodRate={review.foodRate}
                    allowDelete={allowDelete}
                    removeHandler={() => removeHandler(review.id)}
                    key={index}
                />
            ))}
        </Box>
    );
};

export default Reviews;
