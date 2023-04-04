import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface Props {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
}

const TaskCard = ({ provided, snapshot }: Props) => {
    return (
        <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
                bgcolor: "#3c3c3c",
                p: "0.5rem 0.625rem",
                cursor: snapshot.isDragging ? "grab" : "pointer!important",
            }}
        >
            <Typography>Task Title</Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <IconButton color="info" size="small">
                    <EditIcon
                        color="disabled"
                        sx={{
                            "&:hover": {
                                color: "blue",
                            },
                        }}
                        fontSize="small"
                    />
                </IconButton>
                <IconButton color="error" size="small">
                    <DeleteOutlinedIcon
                        sx={{
                            "&:hover": {
                                color: "tomato",
                            },
                        }}
                        color="disabled"
                        fontSize="small"
                    />
                </IconButton>
            </Box>
        </Card>
    );
};

export default TaskCard;
