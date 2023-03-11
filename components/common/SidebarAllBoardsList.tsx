import { AddBox } from "@mui/icons-material";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NextLink from "next/link";
import { IBoard } from "../../utils/types";
import { useRouter } from "next/router";

interface IBoards {
    allBoards: IBoard[];
    boardsCount: number;
}
type THandleDragEnd = ({
    source,
    destination,
}: {
    source: any;
    destination: any;
}) => Promise<void>;

interface Props {
    handleDragEnd: THandleDragEnd;
    boards: IBoards;
}

const SidebarAllBoardsList = ({ handleDragEnd, boards }: Props) => {
    const router = useRouter();

    return (
        <>
            <Typography
                mt="1.875rem"
                fontSize="1.15rem"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    px: "0.75rem",
                }}
            >
                <AddBox fontSize="small" /> Boards
            </Typography>
            <List>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable
                        droppableId="list-board-droppable"
                        key="list-board-droppable"
                    >
                        {(provided) => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {boards.allBoards.map((board, index) => {
                                    return (
                                        <Draggable
                                            key={board._id}
                                            draggableId={board._id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <NextLink
                                                    href={`/board/${board._id}`}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                >
                                                    <ListItemButton
                                                        sx={{
                                                            cursor: snapshot.isDragging
                                                                ? "grab"
                                                                : "pointer",
                                                        }}
                                                        selected={
                                                            router.query
                                                                .boardId ===
                                                            board._id
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={`${board.icon} ${board.title}`}
                                                            sx={{
                                                                px: "0.5rem",
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </NextLink>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </>
    );
};

export default SidebarAllBoardsList;
