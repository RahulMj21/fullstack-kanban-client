import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import BaseLayout from "../components/layout/BaseLayout";
import BoardCreateModal from "../components/Modal/BoardCreateModal";
import { getBoards } from "../features/boardSlice";

export default function Home() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const boards = useSelector(getBoards);

    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

    if (boards.boardsCount > 0)
        router.push(`/board/${boards.allBoards[0]._id}`);

    return (
        <BaseLayout title="Boards">
            <Box
                component="main"
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
                {boards.boardsCount === 0 && (
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
