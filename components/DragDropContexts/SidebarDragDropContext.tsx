import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import { IBoards } from "../../utils/interfaces";
import { TBoardType } from "../../utils/types";

interface Props {
    handleDragEnd: ({ source, destination }: DropResult) => Promise<void>;
    boards: IBoards;
    title: TBoardType;
}

const SidebarDragDropContext = ({ handleDragEnd, boards, title }: Props) => {
    const router = useRouter();

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId={`${title}-list-board-droppable`}
                key={`${title}-list-board-droppable`}
            >
                {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                        {boards.allBoards.map((board, index) => {
                            return (
                                <Draggable
                                    key={board._id}
                                    draggableId={board._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <NextLink href={`/board/${board._id}`}>
                                            <ListItemButton
                                                title={board.title}
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                sx={{
                                                    cursor: snapshot.isDragging
                                                        ? "grab"
                                                        : "pointer",
                                                }}
                                                selected={
                                                    router.query.boardId ===
                                                    board._id
                                                }
                                            >
                                                <ListItemText
                                                    primary={`${board.icon} ${board.title}`}
                                                    sx={{ px: "0.5rem" }}
                                                />
                                            </ListItemButton>
                                        </NextLink>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SidebarDragDropContext;
