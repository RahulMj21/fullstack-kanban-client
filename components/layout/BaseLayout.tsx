import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../features/userSlice";
import { getCurrentUser } from "../../services/users";
import { QUERY_ME } from "../../utils/constants";
import Sidebar from "./Sidebar";

const mainStyles = {
    background: "#333",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    position: "ralative",
    transition: "all 0.4s ease",
};

const sectionStyles = {
    top: "0",
    left: "15rem",
    width: "calc(100vw - 15rem)",
    position: "relative",
    padding: "2rem",
    overflowY: "auto",
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

    const { isLoading, data } = useQuery([QUERY_ME], getCurrentUser, {
        enabled: !!router && user === null && typeof window !== "undefined",
        retry: 1,
        onSuccess: (resp) =>
            resp.success &&
            resp.data &&
            dispatch(setUser({ user: resp.data, isAuthenticated: true })),
        onError: () => router.push("/login"),
    });

    return !isLoading && !loading && data ? (
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
                width="15rem"
                animation="wave"
            />
            <Box width="calc(100vw - 15rem)" p="2rem">
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
