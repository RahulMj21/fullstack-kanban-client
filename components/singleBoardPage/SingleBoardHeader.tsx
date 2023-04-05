import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import StarBoarderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IGetSingleBoardResponse } from "../../utils/interfaces";
import BoardUpdateModal from "../Modal/BoardUpdateModal";
import DeleteBoardPopover from "../Popovers/DeleteBoardPopover";
import AddSectionModal from "../Modal/AddSectionModal";

interface Props {
    data?: IGetSingleBoardResponse;
}

const SingleBoardHeader = ({ data }: Props) => {
    const [isShowUpdateBoard, setIsShowUpdateBoard] = useState(false);
    const [isShowAddSection, setIsShowAddSection] = useState(false);

    return (
        <>
            <BoardUpdateModal
                key={JSON.stringify(data)}
                isOpen={isShowUpdateBoard}
                onClose={() => setIsShowUpdateBoard(false)}
            />
            <AddSectionModal
                isOpen={isShowAddSection}
                onClose={() => setIsShowAddSection(false)}
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
                    <DeleteBoardPopover boardId={data?._id || ""} />
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
                    onClick={() => setIsShowAddSection(true)}
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
