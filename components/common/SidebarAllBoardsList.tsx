import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IBoard } from "../../utils/types";
import BoardCreateModal from "../Modal/BoardCreateModal";
import { useState } from "react";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <BoardCreateModal
                title="create-board"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                    mt: "1.875rem",
                    px: "0.9rem",
                }}
            >
                <Typography
                    fontSize="1.15rem"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                    }}
                >
                    Boards
                </Typography>
                <IconButton
                    title="click to create a new board"
                    aria-label="click to create a new board"
                    onClick={() => setIsModalOpen(true)}
                >
                    <AddBoxIcon fontSize="small" />
                </IconButton>
            </Box>
            <List>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable
                        droppableId="list-board-droppable"
                        key="list-board-droppable"
                    >
                        {(provided) => (
                            <div
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
                                                >
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
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </>
    );
};

export default SidebarAllBoardsList;
