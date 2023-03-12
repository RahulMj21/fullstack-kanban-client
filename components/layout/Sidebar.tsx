import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { clearUser } from "../../features/userSlice";
import { getAllBoards, updateBoardPosition } from "../../services/boards";
import { logoutUser } from "../../services/users";
import { QUERY_ALL_BOARDS } from "../../utils/constants";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import SidebarAllBoardsList from "../common/SidebarAllBoardsList";
import Logo from "../icons/Logo";

const sidebarStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    background: "#555",
    paddingY: "2rem",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowX: "hidden",
    gap: "2rem",
};

const Sidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const boards = useSelector(getBoards);
    const { enqueueSnackbar } = useSnackbar();

    useQuery([QUERY_ALL_BOARDS], getAllBoards, {
        onSuccess: (data) => {
            if (data.success) dispatch(setBoards(data?.data || []));
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

    const { mutate } = useMutation(updateBoardPosition);

    const handleDragEnd = async ({
        source,
        destination,
    }: {
        source: any;
        destination: any;
    }) => {
        try {
            if (source.index === destination.index) return;

            const newBoards = [...boards.allBoards];
            const [removed] = newBoards.splice(source.index, 1);
            newBoards.splice(destination.index, 0, removed);
            dispatch(setBoards(newBoards));

            const reqBody = newBoards.map((board) => {
                return {
                    _id: board._id,
                };
            });
            mutate({ boards: reqBody });
        } catch (error) {
            enqueueSnackbar("cannot update board position", {
                variant: "error",
            });
        }
    };

    return (
        <Box component="aside" width="15rem" title="sidebar" sx={sidebarStyles}>
            <Box sx={{ flex: 1 }}>
                <NextLink
                    href="/"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Logo />
                </NextLink>
                <SidebarAllBoardsList
                    handleDragEnd={handleDragEnd}
                    boards={boards}
                />
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
            >
                Log out
                {isLogoutLoading && <CustomCircullarProgress />}
            </Button>
        </Box>
    );
};

export default Sidebar;
