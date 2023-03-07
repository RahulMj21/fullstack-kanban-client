import { AddBox } from "@mui/icons-material";
import {
    Box,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { getAllBoards, updateBoardPosition } from "../../services/boards";
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
    const { enqueueSnackbar } = useSnackbar();

    useQuery([QUERY_ALL_BOARDS], getAllBoards, {
        onSuccess: (data) => {
            if (data.success) dispatch(setBoards(data?.data || []));
        },
    });

    const { mutate } = useMutation(updateBoardPosition);

    const handleDragEnd = async ({
        source,
        destination,
    }: {
        source: any;
        destination: any;
    }) => {
        try {
            console.log("source :", source);
            console.log("destination :", destination);

            const newBoards = [...boards.allBoards];
            const [removed] = newBoards.splice(source.index, 1);
            newBoards.splice(destination.index, 0, removed);
            dispatch(setBoards(newBoards));

            const reqBody = newBoards.map((board) => {
                return {
                    _id: board._id,
                };
            });
            mutate(reqBody);
        } catch (error) {
            enqueueSnackbar("cannot update board position", {
                variant: "error",
            });
        }
    };

    return (
        <Box component="aside" width="16rem" title="sidebar" sx={sidebarStyles}>
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
