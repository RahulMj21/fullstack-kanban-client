import { Box, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { getAllBoards, updateBoardPosition } from "../../services/boards";
import { QUERY_ALL_BOARDS } from "../../utils/constants";
import SidebarAllBoardsList from "../common/SidebarAllBoardsList";
import BoardCreateModal from "../Modal/BoardCreateModal";

const sidebarStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    background: "#555",
    paddingY: "2.5rem",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowX: "hidden",
};

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
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
            if (source.index === destination.index) return;

            const newBoards = [...boards.allBoards];
            const [removed] = newBoards.splice(source.index, 1);
            newBoards.splice(destination.index, 0, removed);
            dispatch(setBoards(newBoards));

            const reqBody = newBoards.map((board) => {
                return {
                    _id: board._id,
                };
            });
            mutate({ boards: reqBody });
        } catch (error) {
            enqueueSnackbar("cannot update board position", {
                variant: "error",
            });
        }
    };

    return (
        <Box component="aside" width="15rem" title="sidebar" sx={sidebarStyles}>
            <BoardCreateModal
                title="create-board"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <Button
                variant="contained"
                color="success"
                sx={{ mx: "1rem" }}
                onClick={() => setIsModalOpen(true)}
            >
                Add
            </Button>
            <SidebarAllBoardsList
                handleDragEnd={handleDragEnd}
                boards={boards}
            />
        </Box>
    );
};

export default Sidebar;
