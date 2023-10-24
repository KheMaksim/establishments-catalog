import Wrapper from "@/components/wrapper/Wrapper";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import imageNotAvailable from "@/assets/imageNotAvailable.png";
import Gallery from "@/components/gallery/Gallery";
import Ratings from "@/components/ratings/Ratings";
import Reviews from "@/components/review/Reviews";
import ImageForm from "../forms/ImageForm";
import ReviewForm from "../forms/ReviewForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import AnonymousForm from "@/components/UI/anonymousForm/AnonymousForm";
import { useCallback, useEffect } from "react";
import { getReviews, removeReview } from "@/features/review/ReviewActions";
import { getEstablishmentById } from "@/features/establishment/EstablishmentActions";
import { useParams } from "react-router-dom";
import { getPictures, removePicture } from "@/features/picture/PictureActions";
import uploadsPath from "@/constants/uploadsURL";
import Loader from "@/components/UI/loader/Loader";

const EstablishmentPage = () => {
    const { id } = useParams();

    const establishment = useAppSelector((state) => {
        return state.establishment.establishment;
    });
    const isLoading = useAppSelector((state) => state.establishment.isLoading);
    const reviewLoading = useAppSelector((state) => state.review.isLoading);
    const pictureLoading = useAppSelector((state) => state.picture.isLoading);
    const pictures = useAppSelector((state) => state.picture.pictures);
    const reviews = useAppSelector((state) => state.review.reviews);
    const userInfo = useAppSelector((state) => state.user.userInfo);

    const dispatch = useAppDispatch();

    const getEstablishment = useCallback(() => {
        dispatch(getEstablishmentById(Number(id)));
    }, []);

    const getReviewsArray = useCallback(() => {
        dispatch(getReviews(Number(id)));
    }, []);

    const getPicturesArray = useCallback(() => {
        dispatch(getPictures(Number(id)));
    }, []);

    const removeReviewHandler = (reviewId: number) => {
        dispatch(removeReview(reviewId))
            .unwrap()
            .then(() => {
                getReviewsArray();
                getEstablishment();
            });
    };

    const removePictureHandler = (pictureId: number) => {
        dispatch(removePicture(pictureId))
            .unwrap()
            .then(() => getPicturesArray());
    };

    useEffect(() => {
        getEstablishment();
        getReviewsArray();
        getPicturesArray();
    }, [getEstablishment, getReviewsArray, getPicturesArray]);

    return (
        <>
            {isLoading || reviewLoading || pictureLoading ? <Loader /> : null}
            <Container>
                {!isLoading && establishment && (
                    <Wrapper noColumn>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                                justifyContent: "space-between",
                                minHeight: 400,
                                mb: 2,
                            }}
                            gap={2}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "45%",
                                    pt: 3,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    textAlign="center"
                                    textTransform="uppercase"
                                    mb={5}
                                >
                                    {establishment.name}
                                </Typography>

                                <Typography variant="subtitle1">
                                    {establishment.description}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    width: "50%",
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        width: "100%",
                                        borderRadius: 5,
                                        minHeight: 350,
                                        maxHeight: 400,
                                    }}
                                    image={
                                        establishment.image
                                            ? uploadsPath + establishment.image
                                            : imageNotAvailable
                                    }
                                    title="establishment"
                                />
                            </Box>

                            <Gallery
                                images={pictures}
                                allowDelete={userInfo?.role === "admin"}
                                removeHandler={removePictureHandler}
                            />
                        </Box>

                        <Ratings
                            foodRate={establishment.avgFoodRate}
                            interiorRate={establishment.avgInteriorRate}
                            serviceRate={establishment.avgServiceRate}
                        />

                        <Reviews
                            reviews={reviews}
                            allowDelete={userInfo?.role === "admin"}
                            removeHandler={removeReviewHandler}
                        />

                        {userInfo === null ? (
                            <AnonymousForm />
                        ) : (
                            <>
                                <ReviewForm establishmentId={id!.toString()} />
                                <ImageForm establishmentId={id!.toString()} />
                            </>
                        )}
                    </Wrapper>
                )}
            </Container>
        </>
    );
};

export default EstablishmentPage;
