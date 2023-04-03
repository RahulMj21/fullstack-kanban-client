import Box from "@mui/material/Box";
import { customScrollbarStyles } from "../../styles/theme";
import KanbanSection from "./KanbanSection";

const Kanban = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                overflowX: "auto",
                py: "0.5rem",
                ...customScrollbarStyles,
            }}
        >
            {Array(4)
                .fill({})
                .map(() => {
                    return <KanbanSection key={Math.random()} />;
                })}
        </Box>
    );
};

export default Kanban;
