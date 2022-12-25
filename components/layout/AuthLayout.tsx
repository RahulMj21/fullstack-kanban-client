import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

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
                {children}
            </Box>
        </Box>
    );
};

export default AuthLayout;
