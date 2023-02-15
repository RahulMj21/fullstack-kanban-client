import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../../features/userSlice";
import { getCurrentUser } from "../../services";
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
    const [isLoading, setIsLoding] = useState(true);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const isRetryRef = useRef(false);

    const fetchUser = useCallback(async () => {
        try {
            if (user) return;
            const resp = await getCurrentUser();
            if (resp.success && resp.data) {
                dispatch(setUser({ user: resp.data, isAuthenticated: true }));
            } else {
                router.push("/login");
            }
            setIsLoding(false);
        } catch (error: any) {
            router.push("/login");
        }
    }, [dispatch, router, user]);

    useEffect(() => {
        if (!isRetryRef.current) {
            fetchUser();
        }
        isRetryRef.current = true;
    }, [fetchUser]);

    return !isLoading && user ? (
        <Box component="main" sx={mainStyles}>
            <Sidebar />
            <Box component="section" title={title} sx={sectionStyles}>
                {children}
            </Box>
        </Box>
    ) : (
        <Typography>Loading...</Typography>
    );
};

export default BaseLayout;
