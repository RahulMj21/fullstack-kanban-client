import Box from "@mui/material/Box";
import { DragDropContext } from "react-beautiful-dnd";
import { customScrollbarStyles } from "../../styles/theme";
import { MOCK_SECTIONS } from "../../utils/constants";
import KanbanSection from "./KanbanSection";

const Kanban = () => {
    const handleDragEnd = () => {};

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
            <DragDropContext onDragEnd={handleDragEnd}>
                {MOCK_SECTIONS.map(({ title }) => {
                    return <KanbanSection title={title} key={Math.random()} />;
                })}
            </DragDropContext>
        </Box>
    );
};

export default Kanban;
