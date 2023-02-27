import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import BaseLayout from "../components/layout/BaseLayout";
import BoardCreateModal from "../components/Modal/BoardCreateModal";
import { getBoards } from "../features/boardSlice";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const boards = useSelector(getBoards);

    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

    // console.log(boards);
    return (
        <BaseLayout title="Boards">
            <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BoardCreateModal
                    title="create-board"
                    isOpen={isModalOpen}
                    onClose={onClose}
                />
                {boards.length > 0 && (
                    <LoadingButton
                        variant="outlined"
                        color="success"
                        onClick={onOpen}
                    >
                        Click here to create your first board.
                    </LoadingButton>
                )}
            </Box>
        </BaseLayout>
    );
}
