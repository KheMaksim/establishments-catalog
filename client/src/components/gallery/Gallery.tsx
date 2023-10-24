import { Box, Typography, CardMedia, Card, Button } from "@mui/material";
import imageNotAvailable from "@/assets/imageNotAvailable.png";
import IPicture from "@/interfaces/IPicture";
import uploadsPath from "@/constants/uploadsURL";

interface Props {
    images: IPicture[];
    allowDelete: boolean;
    removeHandler: (pictureId: number) => void;
}

const Gallery = ({ images, allowDelete, removeHandler }: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "100%",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                pt: 3,
                pb: 3,
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                textTransform="uppercase"
                mb={3}
            >
                Gallery
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    mb: 2,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                        height: 10,
                        WebkitAppearance: "none",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        border: "2px solid",
                        borderColor: "#E7EBF0",
                        backgroundColor: "rgba(0 0 0 / 0.5)",
                    },
                }}
            >
                {images.map((image, index) => (
                    <Card
                        key={index + 1}
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 3,
                            flexShrink: 0,
                            position: "relative",
                            mr: 1,
                            mb: 1,
                        }}
                    >
                        <CardMedia
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                            image={
                                image.image === ""
                                    ? imageNotAvailable
                                    : uploadsPath + image.image
                            }
                            title="establishment"
                        />
                        {allowDelete ? (
                            <Button
                                size="small"
                                onClick={() => removeHandler(image.id)}
                                variant={"contained"}
                                color="error"
                                sx={{
                                    minWidth: 35,
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                }}
                            >
                                X
                            </Button>
                        ) : null}
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Gallery;
