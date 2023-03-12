import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBoarderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BaseLayout from "../../components/layout/BaseLayout";
import { getSingleBoard } from "../../services/boards";
import { QUERY_SINGLE_BOARD } from "../../utils/constants";

const SingleBoard = () => {
    const router = useRouter();
    const boardId = router.query.boardId as string;

    const { data, isLoading } = useQuery(
        [QUERY_SINGLE_BOARD, boardId],
        () => getSingleBoard(boardId),
        {
            enabled: !!boardId,
        }
    );

    return (
        <BaseLayout loading={isLoading && !data} title="single board">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                }}
            >
                <IconButton aria-label="Favourite">
                    {data?.favourite ? (
                        <StarOutlinedIcon color="warning" />
                    ) : (
                        <StarBoarderOutlinedIcon />
                    )}
                </IconButton>
                <IconButton color="error">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
            <Box mt="1rem">
                <Box>{/* Emoji Picker */}</Box>
                <Typography variant="h4" fontWeight="700">
                    {data?.title}
                </Typography>
            </Box>
        </BaseLayout>
    );
};

export default SingleBoard;
