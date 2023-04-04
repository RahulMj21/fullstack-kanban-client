import Box from "@mui/material/Box";
import { customScrollbarStyles } from "../../styles/theme";
import KanbanDragDropContext from "../DragDropContexts/KanbanDragDropContext";

const Kanban = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                overflowX: "auto",
                py: "0.5rem",
                ...customScrollbarStyles,
            }}
        >
            <KanbanDragDropContext />
        </Box>
    );
};

export default Kanban;
