import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import {
    getFavouriteBoards,
    setFavouriteBoards,
} from "../../features/favouriteBoardSlice";
import { clearUser } from "../../features/userSlice";
import {
    fetchFavouriteBoards,
    fetchMyBoards,
    updateBoardPosition,
    updateFavouriteBoardPosition,
} from "../../services/boards";
import { logoutUser } from "../../services/users";
import { sidebarOverflowDivStyles, sidebarStyles } from "../../styles/theme";
import { QUERY_FAVOURITE_BOARDS, QUERY_MY_BOARDS } from "../../utils/constants";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import SidebarBoardsList from "../common/SidebarBoardsList";
import Logo from "../icons/Logo";

const Sidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const boards = useSelector(getBoards);
    const favouriteBoards = useSelector(getFavouriteBoards);
    const { enqueueSnackbar } = useSnackbar();

    useQuery([QUERY_MY_BOARDS], fetchMyBoards, {
        onSuccess: (data) => {
            if (data.success) dispatch(setBoards(data?.data || []));
        },
    });

    useQuery([QUERY_FAVOURITE_BOARDS], fetchFavouriteBoards, {
        onSuccess: (data) => {
            if (data.success) dispatch(setFavouriteBoards(data?.data || []));
        },
    });

    const { isLoading: isLogoutLoading, mutate: mutateLogout } = useMutation(
        logoutUser,
        {
            onSuccess: (data) => {
                if (data.success) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(clearUser());
                    router.push("/login");
                }
            },
            onError: (err: any) => {
                const msg = err?.response?.data?.message || err.message;
                enqueueSnackbar(msg, { variant: "error" });
            },
        }
    );

    return (
        <Box component="aside" width="15rem" title="sidebar" sx={sidebarStyles}>
            <Box sx={{ flex: 1 }}>
                <NextLink
                    href="/"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1rem",
                    }}
                >
                    <Logo />
                </NextLink>
                <Box sx={sidebarOverflowDivStyles}>
                    {favouriteBoards.allBoards.length > 0 && (
                        <SidebarBoardsList
                            title="Favourites"
                            boards={favouriteBoards}
                            positionUpdateFn={updateFavouriteBoardPosition}
                        />
                    )}
                    {boards.allBoards.length > 0 && (
                        <SidebarBoardsList
                            title="Boards"
                            boards={boards}
                            positionUpdateFn={updateBoardPosition}
                            canAdd={true}
                        />
                    )}
                </Box>
            </Box>
            <Button
                startIcon={<LogoutIcon />}
                variant="contained"
                color="warning"
                sx={{
                    padding: "0.4rem 1.3rem",
                    mx: "1rem",
                    textTransform: "capitalize",
                }}
                onClick={() => mutateLogout()}
                endIcon={isLogoutLoading && <CustomCircullarProgress />}
            >
                Log out
            </Button>
        </Box>
    );
};

export default Sidebar;
