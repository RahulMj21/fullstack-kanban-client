import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BoardCreateModal from "../components/Modal/BoardCreateModal";
import { fetchMyBoards } from "../services/boards";
import { QUERY_MY_BOARDS } from "../utils/constants";

export default function Home() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

    const { data, isLoading } = useQuery([QUERY_MY_BOARDS], fetchMyBoards);

    if (data && Array.isArray(data?.data) && data?.data?.length > 0)
        router.push(`/board/${data.data[0]._id}`);

    return (
        <BaseLayout title="Boards" loading={isLoading}>
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
                <BoardCreateModal isOpen={isModalOpen} onClose={onClose} />
                {data &&
                    Array.isArray(data?.data) &&
                    data?.data?.length === 0 && (
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
