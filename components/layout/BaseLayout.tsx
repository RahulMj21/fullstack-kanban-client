import { Box, Button, Skeleton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser, setUser } from "../../features/userSlice";
import { getCurrentUser, logoutUser } from "../../services/users";
import { QUERY_ME } from "../../utils/constants";
import Sidebar from "./Sidebar";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import { useSnackbar } from "notistack";

const mainStyles = {
    background: "#333",
    height: "100vh",
    width: "100%",
    display: "flex",
    overflow: "hidden",
    transition: "all 0.4s ease",
};

const sectionStyles = {
    position: "relative",
    padding: "2.5rem 2rem",
    overflowY: "auto",
    width: "100%",
};

interface Props {
    title: string;
    children: ReactNode;
    loading?: boolean;
}

const BaseLayout = ({ title, children, loading = false }: Props) => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { isLoading, data } = useQuery([QUERY_ME], getCurrentUser, {
        enabled: !!router && user === null && typeof window !== "undefined",
        retry: 1,
        onSuccess: (resp) =>
            resp.success &&
            resp.data &&
            dispatch(setUser({ user: resp.data, isAuthenticated: true })),
        onError: () => router.push("/login"),
    });
    const { isLoading: isLogoutLoading, mutate } = useMutation(logoutUser, {
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
    });

    return !isLoading && !loading && data ? (
        <Box component="main" sx={mainStyles}>
            <Sidebar />
            <Box component="section" title={title} sx={sectionStyles}>
                <Button
                    startIcon={<Logout />}
                    variant="contained"
                    sx={{
                        position: "absolute",
                        top: "2rem",
                        right: "2rem",
                        padding: "0.4rem 1.3rem",
                        textTransform: "capitalize",
                    }}
                    onClick={() => mutate()}
                >
                    Logout
                    {isLogoutLoading && <CustomCircullarProgress />}
                </Button>
                {children}
            </Box>
        </Box>
    ) : (
        <LayoutSkeleton />
    );
};

export default BaseLayout;

function LayoutSkeleton() {
    return (
        <Box sx={mainStyles}>
            <Skeleton
                variant="rectangular"
                height="100vh"
                width="14rem"
                animation="wave"
            />
            <Box width="calc(100vw - 14rem)" p="2rem">
                <Skeleton height={150} width={700} animation="wave" />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                        mt: "2rem",
                    }}
                >
                    {[...new Array(4)].map(() => (
                        <Box key={Math.random()} width={300} gap="1rem">
                            <Skeleton
                                variant="rectangular"
                                height={50}
                                sx={{ mb: "0.8rem" }}
                                animation="wave"
                            />
                            <Skeleton
                                variant="rectangular"
                                height={500}
                                animation="wave"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
