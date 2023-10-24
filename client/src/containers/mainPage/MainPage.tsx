import Item from "@/components/card/Item";
import Wrapper from "@/components/wrapper/Wrapper";
import {
    getEstablishments,
    removeEstablishment,
} from "@/features/establishment/EstablishmentActions";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Container, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const establishments = useAppSelector(
        (state) => state.establishment.establishments
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const continueHandler = (id: number) => {
        navigate("/establishment/" + id);
    };

    const removeHandler = (id: number) => {
        dispatch(removeEstablishment(id))
            .unwrap()
            .then(() => getArtistsArray());
    };

    const getArtistsArray = useCallback(() => {
        dispatch(getEstablishments());
    }, []);

    useEffect(() => {
        getArtistsArray();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Typography
                    variant="h4"
                    textAlign="center"
                    textTransform="uppercase"
                >
                    All places
                </Typography>
                <Wrapper noColumn>
                    {establishments.length < 1 ? (
                        <Typography
                            variant="h6"
                            textAlign="center"
                            textTransform="uppercase"
                        >
                            No establishments in catalog.
                        </Typography>
                    ) : (
                        establishments.map((establishment, index) => (
                            <Item
                                key={index}
                                image={establishment.image}
                                title={establishment.name}
                                allowDelete={userInfo?.role === "admin"}
                                rating={establishment.overallRate}
                                reviewsQty={establishment.reviews.length}
                                imagesQty={establishment.pictures.length}
                                continueHandler={() =>
                                    continueHandler(establishment.id)
                                }
                                removeHandler={() =>
                                    removeHandler(establishment.id)
                                }
                            />
                        ))
                    )}
                </Wrapper>
            </Wrapper>
        </Container>
    );
};

export default MainPage;
