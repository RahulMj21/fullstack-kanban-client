import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BoardCreateModal from "../components/Modal/BoardCreateModal";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

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
                <BoardCreateModal isOpen={isModalOpen} onClose={onClose} />

                <LoadingButton
                    variant="outlined"
                    color="success"
                    onClick={onOpen}
                >
                    Click here to create your first board.
                </LoadingButton>
            </Box>
        </BaseLayout>
    );
}
