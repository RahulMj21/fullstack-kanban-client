import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KanbanSectionMenu from "../menus/KanbanSectionMenu";

const KanbanSection = () => {
    return (
        <Box
            key={Math.random()}
            sx={{
                flex: "0 0 15rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography>Title</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton aria-label="delete">
                        <AddIcon fontSize="small" color="disabled" />
                    </IconButton>
                    <KanbanSectionMenu />
                </Box>
            </Box>
        </Box>
    );
};

export default KanbanSection;
