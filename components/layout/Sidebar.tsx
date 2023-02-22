import { MenuOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { getAllBoards } from "../../services/boards";
import { QUERY_ALL_BOARDS } from "../../utils/constants";

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
    const boards = useSelector(getBoards);
    const dispatch = useDispatch();

    useQuery([QUERY_ALL_BOARDS], getAllBoards, {
        onSuccess: (data) => {
            console.log(data);
            if (data.success) dispatch(setBoards(data?.data || []));
        },
    });

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
