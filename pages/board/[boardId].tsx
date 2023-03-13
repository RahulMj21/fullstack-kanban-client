import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BaseLayout from "../../components/layout/BaseLayout";
import SingleBoardHeader from "../../components/singleBoardPage/SingleBoardHeader";
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
            <SingleBoardHeader data={data} />
        </BaseLayout>
    );
};

export default SingleBoard;
