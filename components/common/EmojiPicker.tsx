import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { MouseEvent, useEffect, useState } from "react";
import {
    FieldValues,
    Path,
    PathValue,
    UnPackAsyncDefaultValues,
    UseFormSetValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    registerKey: Path<UnPackAsyncDefaultValues<T>>;
    icon?: string;
}

function EmojiPicker<T extends FieldValues>({
    icon,
    setValue,
    registerKey,
}: Props<T>) {
    const [selectedEmoji, setSelectedEmoji] = useState<string>();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleSelectEmoji = ({ native }: { native: string }) => {
        setSelectedEmoji(native);
        setValue(
            registerKey,
            native as PathValue<
                UnPackAsyncDefaultValues<T>,
                Path<UnPackAsyncDefaultValues<T>>
            >
        );
        handleClose();
    };

    useEffect(() => {
        if (icon) setSelectedEmoji(icon);
    }, [icon]);

    return (
        <Box sx={{ position: "relative" }}>
            <IconButton aria-describedby={id} onClick={handleClick}>
                {selectedEmoji}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
            >
                <Picker
                    data={data}
                    theme="dark"
                    onEmojiSelect={handleSelectEmoji}
                />
            </Popover>
        </Box>
    );
}

export default EmojiPicker;
