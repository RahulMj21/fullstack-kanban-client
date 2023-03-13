import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../features/userSlice";
import { getCurrentUser } from "../../services/users";
import { QUERY_ME } from "../../utils/constants";
import LayoutSkeleton from "../skeleton/LayoutSkeleton";
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
