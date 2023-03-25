import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { setBoards } from "../../features/boardSlice";
import { setFavouriteBoards } from "../../features/favouriteBoardSlice";
import { IBoards, IResponse } from "../../utils/interfaces";
import { TBoardType } from "../../utils/types";
import SidebarDragDropContext from "../DragDropContexts/SidebarDragDropContext";
import BoardCreateModal from "../Modal/BoardCreateModal";

interface Props {
    title: TBoardType;
    boards: IBoards;
    positionUpdateFn: (body: {
        boards: {
            _id: string;
        }[];
    }) => Promise<IResponse>;
    canAdd?: boolean;
}

const SidebarAllBoardsList = ({
    title,
    boards,
    positionUpdateFn,
    canAdd,
}: Props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mutate } = useMutation(positionUpdateFn);

    const handleDragEnd = async ({ source, destination }: DropResult) => {
        try {
            if (source.index === destination?.index || !destination) return;

            const newBoards = [...boards.allBoards];
            const [removed] = newBoards.splice(source.index, 1);
            newBoards.splice(destination.index, 0, removed);
            const reqBody = newBoards.map((board) => {
                return {
                    _id: board._id,
                };
            });
            if (title === "Boards") {
                dispatch(setBoards(newBoards));
            } else if (title === "Favourites") {
                dispatch(setFavouriteBoards(newBoards));
            }
            mutate({ boards: reqBody });
        } catch (error) {
            enqueueSnackbar("cannot update board position", {
                variant: "error",
            });
        }
    };

    return (
        <>
            <BoardCreateModal
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
                    {title}
                </Typography>
                {canAdd && (
                    <IconButton
                        title="click to create a new board"
                        aria-label="click to create a new board"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <AddBoxIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
            <List>
                <SidebarDragDropContext
                    title={title}
                    handleDragEnd={handleDragEnd}
                    boards={boards}
                />
            </List>
        </>
    );
};

export default SidebarAllBoardsList;
