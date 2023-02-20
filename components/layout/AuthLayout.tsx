import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setUser } from "../../features/userSlice";
import { getCurrentUser } from "../../services/users";
import { QUERY_ME } from "../../utils/constants";

interface Props {
    title: string;
    children: ReactNode;
}

const mainStyles = {
    background: "#333",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0",
};
const sectionStyles = {
    width: "28rem",
    padding: "1.5rem",
    background:
        "linear-gradient(-45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
    borderLeft: "1px solid rgba(255,255,255,0.2)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "1.5rem",
    color: "#f1f1f1",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const AuthLayout = ({ title, children }: Props) => {
    const router = useRouter();
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const { isLoading, data } = useQuery([QUERY_ME], getCurrentUser, {
        enabled: !!router && user === null && typeof window !== "undefined",
        retry: 1,
        onSuccess: (resp) => {
            if (resp.success && resp.data) {
                dispatch(setUser({ user: resp.data, isAuthenticated: true }));
                router.push("/");
            }
        },
    });

    return (
        <Box component="main" sx={mainStyles}>
            <Box component="section" title={title} sx={sectionStyles}>
                <Typography
                    variant="h4"
                    textTransform="capitalize"
                    textAlign="center"
                    mb="1rem"
                >
                    {title}
                </Typography>
                {isLoading && !data ? (
                    <>
                        <Skeleton
                            variant="rectangular"
                            height={50}
                            animation="wave"
                        />
                        <Skeleton
                            variant="rectangular"
                            height={50}
                            animation="wave"
                        />
                        <Skeleton
                            variant="rectangular"
                            height={50}
                            animation="wave"
                        />
                    </>
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
};

export default AuthLayout;
