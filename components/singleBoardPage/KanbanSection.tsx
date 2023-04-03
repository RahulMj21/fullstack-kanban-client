import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Draggable, Droppable } from "react-beautiful-dnd";
import KanbanSectionMenu from "../menus/KanbanSectionMenu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface Props {
    title: string;
}

const KanbanSection = ({ title }: Props) => {
    return (
        <Box
            key={Math.random()}
            sx={{
                flex: "0 0 15rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "0.625rem",
                }}
            >
                <Typography>{title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton aria-label="delete">
                        <AddIcon fontSize="small" color="disabled" />
                    </IconButton>
                    <KanbanSectionMenu />
                </Box>
            </Box>
            <Droppable
                droppableId={`droppable-${title}`}
                key={`droppable-${title}`}
            >
                {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                        }}
                    >
                        {Array(5)
                            .fill({})
                            .map((_, index) => (
                                <Draggable
                                    key={`hello-${index}`}
                                    draggableId={`hello-${index}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                                bgcolor: "#3c3c3c",
                                                p: "0.5rem 0.625rem",
                                                cursor: snapshot.isDragging
                                                    ? "grab"
                                                    : "pointer!important",
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
                                                <IconButton
                                                    color="info"
                                                    size="small"
                                                >
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
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                >
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
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};

export default KanbanSection;
