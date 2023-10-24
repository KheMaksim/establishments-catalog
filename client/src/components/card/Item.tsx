import uploadsPath from "@/constants/uploadsURL";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";
import { MouseEventHandler } from "react";
import imageNotAvailable from "@/assets/imageNotAvailable.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface Props {
    image: string;
    title: string;
    rating: number;
    reviewsQty: number;
    imagesQty: number;
    allowDelete?: boolean;
    continueHandler: MouseEventHandler<HTMLButtonElement>;
    removeHandler: MouseEventHandler<HTMLButtonElement>;
}

const Item = ({
    image,
    title,
    rating,
    reviewsQty,
    imagesQty,
    allowDelete,
    continueHandler,
    removeHandler,
}: Props) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: 300,
                padding: 3,
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "9px 12px 13px 3px rgba(34, 60, 80, 0.3)",
                },
            }}
        >
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

            <Button
                size="small"
                onClick={continueHandler}
                variant={"text"}
                sx={{
                    alignSelf: "center",
                    minWidth: 35,
                    borderRadius: "50%",
                    mb: 2,
                }}
            >
                <CardMedia
                    sx={{
                        height: 200,
                        width: 200,
                        borderRadius: "50%",
                    }}
                    image={
                        image === "" ? imageNotAvailable : uploadsPath + image
                    }
                    title="establishment"
                />
            </Button>

            <Button size="small" onClick={continueHandler} variant={"text"}>
                {title}
            </Button>

            <CardContent sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Rating readOnly value={rating} precision={0.1} />
                    <Typography variant="body2" color="text.secondary">
                        {rating}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <CameraAltIcon
                        sx={{
                            width: 24,
                            height: 24,
                            mr: 1,
                            alignSelf: "center",
                        }}
                    ></CameraAltIcon>
                    <Typography variant="body2" color="text.secondary">
                        {`${imagesQty} ${imagesQty < 2 ? "photo" : "photos"}`}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {`${reviewsQty} ${reviewsQty < 2 ? "review" : "reviews"}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Item;
