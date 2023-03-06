import { AddBox } from "@mui/icons-material";
import {
    Box,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { getAllBoards } from "../../services/boards";
import { QUERY_ALL_BOARDS } from "../../utils/constants";
import BoardCreateModal from "../Modal/BoardCreateModal";

const sidebarStyles = {
    position: "relative",
    background: "#555",
    padding: "1rem",
    paddingTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
};

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const boards = useSelector(getBoards);

    useQuery([QUERY_ALL_BOARDS], getAllBoards, {
        onSuccess: (data) => {
            if (data.success) dispatch(setBoards(data?.data || []));
        },
    });

    const handleDragEnd = () => {};

    return (
        <Box component="aside" width="14rem" title="sidebar" sx={sidebarStyles}>
            <BoardCreateModal
                title="create-board"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <Button onClick={() => setIsModalOpen(true)}>Add</Button>
            <Typography
                mt="1.875rem"
                fontSize="1.15rem"
                sx={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
            >
                <AddBox fontSize="small" /> Boards
            </Typography>
            <List>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={"list-board-droppable"}>
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
                                                        style={{
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
        </Box>
    );
};

export default Sidebar;
