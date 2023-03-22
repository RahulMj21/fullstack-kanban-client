import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBoarderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IGetSingleBoardResponse } from "../../utils/types";
import BoardUpdateModal from "../Modal/BoardUpdateModal";

interface Props {
    data?: IGetSingleBoardResponse;
}

const SingleBoardHeader = ({ data }: Props) => {
    const [isShowUpdateBoard, setIsShowUpdateBoard] = useState(false);

    return (
        <>
            <BoardUpdateModal
                key={data?._id}
                isOpen={isShowUpdateBoard}
                onClose={() => setIsShowUpdateBoard(false)}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                }}
            >
                <IconButton
                    aria-label={
                        data?.favourite ? "Favourite" : "Add to Favourite"
                    }
                    title={data?.favourite ? "Favourite" : "Add to Favourite"}
                >
                    {data?.favourite ? (
                        <StarOutlinedIcon color="warning" />
                    ) : (
                        <StarBoarderOutlinedIcon />
                    )}
                </IconButton>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <IconButton
                        aria-label="edit board"
                        title="Edit Board"
                        color="info"
                        onClick={() => setIsShowUpdateBoard(true)}
                    >
                        <AutoFixHighOutlinedIcon />
                    </IconButton>
                    <IconButton
                        title="Delete Board"
                        aria-label="delete board"
                        color="error"
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Typography
                my="1rem"
                sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                variant="h4"
                fontWeight="700"
            >
                {`${data?.icon} ${data?.title}`}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                    my: "1rem",
                }}
            >
                <Button
                    startIcon={<AddOutlinedIcon />}
                    sx={{ textTransform: "capitalize" }}
                >
                    Add Section
                </Button>
                <Chip
                    label={`${data?.sections?.length || 0} Sections`}
                    variant="outlined"
                />
            </Box>
            <Divider />
        </>
    );
};

export default SingleBoardHeader;
