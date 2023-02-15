import { MenuOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

const sidebarStyles = {
    position: "relative",
    background: "#555",
    padding: "1.5rem",
    paddingTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
};

const menuButtonStyles = {
    position: "absolute",
    top: ".5rem",
    left: ".5rem",
};

const Sidebar = () => {
    const [menuToggled, setMenuToggled] = useState(false);

    return (
        <Box
            component="aside"
            title="sidebar"
            width={menuToggled ? "3.7rem" : "14rem"}
            sx={sidebarStyles}
        >
            <IconButton
                sx={menuButtonStyles}
                onClick={() => setMenuToggled(!menuToggled)}
            >
                <MenuOutlined />
            </IconButton>
        </Box>
    );
};

export default Sidebar;
