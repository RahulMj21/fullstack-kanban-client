import { Box, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../features/userSlice";
import { getCurrentUser } from "../../services";
import { QUERY_ME } from "../../utils/constants";
import Sidebar from "./Sidebar";

const mainStyles = {
    background: "#333",
    height: "100vh",
    width: "100%",
    display: "flex",
    overflow: "hidden",
    transition: "all 0.4s ease",
};

const sectionStyles = {
    padding: "1.5rem",
    overflowY: "auto",
    width: "100%",
};

interface Props {
    title: string;
    children: ReactNode;
}

const BaseLayout = ({ title, children }: Props) => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const { isLoading, data } = useQuery([QUERY_ME], getCurrentUser, {
        enabled: !!router && user === null && typeof window !== "undefined",
        retry: 1,
        onSuccess: (resp) =>
            resp.success &&
            resp.data &&
            dispatch(setUser({ user: resp.data, isAuthenticated: true })),
        onError: () => router.push("/login"),
    });

    return !isLoading && data ? (
        <Box component="main" sx={mainStyles}>
            <Sidebar />
            <Box component="section" title={title} sx={sectionStyles}>
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
