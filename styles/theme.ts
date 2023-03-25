import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const formStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    pb: "1rem",
};

export const formSubmitButtonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    borderRadius: "0.2rem",
    boxShadow: "none",
    mt: "1rem",
};

export const sidebarStyles = {
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

export const sidebarOverflowDivStyles = {
    width: "100%",
    height: "580px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "0.5rem",
    },
};

export default theme;
