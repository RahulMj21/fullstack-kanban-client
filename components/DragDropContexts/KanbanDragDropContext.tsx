import Box from "@mui/material/Box";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MOCK_SECTIONS } from "../../utils/constants";
import KanbanColumnHeader from "../singleBoardPage/KanbanColumnHeader";
import TaskCard from "../singleBoardPage/TaskCard";

const KanbanDragDropContext = () => {
    const handleDragEnd = () => {};

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {MOCK_SECTIONS.map(({ title }) => {
                return (
                    <Box sx={{ flex: "0 0 15rem" }} key={title}>
                        <KanbanColumnHeader {...{ title }} />
                        <Droppable
                            droppableId={`droppable-${title}`}
                            key={`droppable-${title}`}
                        >
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.75rem",
                                    }}
                                >
                                    {Array(5)
                                        .fill({})
                                        .map((_, index) => (
                                            <Draggable
                                                key={`hello-${title}-${index}`}
                                                draggableId={`hello-${title}-${index}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <TaskCard
                                                        {...{
                                                            provided,
                                                            snapshot,
                                                        }}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </Box>
                );
            })}
        </DragDropContext>
    );
};

export default KanbanDragDropContext;
