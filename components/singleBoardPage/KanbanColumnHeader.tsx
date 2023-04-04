import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KanbanSectionMenu from "../menus/KanbanSectionMenu";

interface Props {
    title: string;
}

const KanbanColumnHeader = ({ title }: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "0.625rem",
            }}
        >
            <Typography>{title}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="delete">
                    <AddIcon fontSize="small" color="disabled" />
                </IconButton>
                <KanbanSectionMenu />
            </Box>
        </Box>
    );
};

export default KanbanColumnHeader;
