import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { MouseEvent, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function KanbanSectionMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="delete"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon color="disabled" fontSize="small" />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    "& .MuiList-root.MuiMenu-list": {
                        width: "7.5rem",
                    },
                    "& li": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    Edit <EditIcon fontSize="small" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Delete <DeleteOutlinedIcon fontSize="small" />
                </MenuItem>
            </Menu>
        </>
    );
}
