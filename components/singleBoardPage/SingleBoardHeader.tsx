import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBoarderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import Divider from "@mui/material/Divider";
import { IGetSingleBoardResponse } from "../../utils/types";
import EmojiPicker from "../common/EmojiPicker";

interface Props {
    data?: IGetSingleBoardResponse;
}

const SingleBoardHeader = ({ data }: Props) => {
    return (
        <>
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
            <Box
                mt="1rem"
                sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
                <EmojiPicker icon={data?.icon} />
                <Typography variant="h4" fontWeight="700">
                    {data?.title}
                </Typography>
            </Box>
            <Typography>{data?.description}</Typography>
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
