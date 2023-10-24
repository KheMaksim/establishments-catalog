import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import UserMenu from "../UI/userMenu/UserMenu";
import { Box, Button, Grid } from "@mui/material";
import AnonymousMenu from "../UI/anonymousMenu/AnonymousMenu";
import { logoutUser } from "@/features/user/UserActions";

const Header = () => {
    const user = useAppSelector((state) => state.user.userInfo);

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <Box
            sx={{
                background: "#1976d2",
                width: "100%",
                height: 92,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
            }}
        >
            <Button
                component={Link}
                to={"/"}
                variant="contained"
                color="inherit"
            >
                Home
            </Button>
            {user ? (
                <Grid container justifyContent={"flex-end"}>
                    <Button
                        component={Link}
                        to={"/form"}
                        variant="contained"
                        color="inherit"
                        sx={{ ml: 1 }}
                    >
                        Add new
                    </Button>
                    <UserMenu
                        username={user.username}
                        onLogoutHandler={logoutHandler}
                    />
                </Grid>
            ) : (
                <AnonymousMenu />
            )}
        </Box>
    );
};

export default Header;
