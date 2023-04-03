import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../services/boards";
import { useSnackbar } from "notistack";
import {
    QUERY_FAVOURITE_BOARDS,
    QUERY_MY_BOARDS,
    QUERY_SINGLE_BOARD,
} from "../../utils/constants";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import { useRouter } from "next/router";

interface Props {
    boardId: string;
}

const DeleteBoardPopover = ({ boardId }: Props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = !!anchorEl;
    const id = open ? "delete-board-popover" : undefined;

    const { mutate, isLoading } = useMutation(deleteBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_MY_BOARDS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_FAVOURITE_BOARDS],
            });
            enqueueSnackbar("Board Deleted", { variant: "success" });
            router.push("/");
            handleClose();
        },
        onError: (err: any) => {
            const msg = err?.response?.data?.message
                ? err.response.data.message
                : err.message;
            enqueueSnackbar(msg, { variant: "error" });
            handleClose();
        },
    });
    const handleDelete = () => {
        try {
            mutate(boardId);
        } catch (error) {
            enqueueSnackbar("Failed to delete board", { variant: "error" });
            handleClose();
        }
    };

    return (
        <Box>
            <IconButton
                title="Delete Board"
                aria-label="delete board"
                aria-describedby={id}
                color="error"
                onClick={handleClick}
            >
                <DeleteOutlinedIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box
                    sx={{
                        width: "27rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.625rem",
                        padding: "0.625rem",
                    }}
                >
                    <Typography variant="h5">Delete Board</Typography>
                    <Typography>
                        Are you sure to delete the board?. This action cannot be
                        undone ⚠️
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "0.75rem",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            color="success"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={isLoading}
                            endIcon={
                                isLoading && (
                                    <CustomCircullarProgress progressColor="#767676" />
                                )
                            }
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default DeleteBoardPopover;
