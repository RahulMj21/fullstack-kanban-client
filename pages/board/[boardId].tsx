import { Typography } from "@mui/material";
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
            <Typography variant="h3">BOARD :</Typography>
            <Typography>{JSON.stringify(data?.data)}</Typography>
        </BaseLayout>
    );
};

export default SingleBoard;
