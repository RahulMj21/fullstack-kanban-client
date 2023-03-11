import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import { getAllBoards, updateBoardPosition } from "../../services/boards";
import { QUERY_ALL_BOARDS } from "../../utils/constants";
import SidebarAllBoardsList from "../common/SidebarAllBoardsList";

const sidebarStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    background: "#555",
    paddingY: "2rem",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowX: "hidden",
};

const Sidebar = () => {
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
            <Typography
                textAlign="center"
                variant="h4"
                style={{ fontFamily: "Rock Salt" }}
            >
                Kanban
            </Typography>
            <SidebarAllBoardsList
                handleDragEnd={handleDragEnd}
                boards={boards}
            />
        </Box>
    );
};

export default Sidebar;
