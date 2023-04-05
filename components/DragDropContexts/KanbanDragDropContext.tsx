import Box from "@mui/material/Box";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MOCK_SECTIONS, QUERY_SINGLE_BOARD } from "../../utils/constants";
import KanbanColumnHeader from "../singleBoardPage/KanbanColumnHeader";
import TaskCard from "../singleBoardPage/TaskCard";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getSingleBoard } from "../../services/boards";

const KanbanDragDropContext = () => {
    const router = useRouter();
    const boardId = router.query.boardId as string;

    const { data } = useQuery(
        [QUERY_SINGLE_BOARD, boardId],
        () => getSingleBoard(boardId),
        {
            enabled: !!boardId,
        }
    );

    const handleDragEnd = () => {};

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {data?.sections.map(({ title }) => {
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
