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

export default theme;
