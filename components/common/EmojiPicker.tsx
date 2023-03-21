import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
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
    const [isShowPicker, setIsShowPicker] = useState(false);

    const handleSelectEmoji = ({ native }: { native: string }) => {
        setSelectedEmoji(native);
        setValue(
            registerKey,
            native as PathValue<
                UnPackAsyncDefaultValues<T>,
                Path<UnPackAsyncDefaultValues<T>>
            >
        );
        setIsShowPicker(false);
    };

    useEffect(() => {
        if (icon) setSelectedEmoji(icon);
    }, [icon]);

    return (
        <Box sx={{ position: "relative" }}>
            <Typography
                variant="h5"
                sx={{ cursor: "pointer", fontWeight: 700 }}
                onClick={() => setIsShowPicker(!isShowPicker)}
            >
                {selectedEmoji}
            </Typography>
            <Box
                sx={{
                    display: isShowPicker ? "block" : "none",
                    position: "absolute",
                    top: "100%",
                    zIndex: 9999,
                }}
            >
                <Picker
                    data={data}
                    theme="dark"
                    onEmojiSelect={handleSelectEmoji}
                    onClickOutside={() => {
                        if (isShowPicker) setIsShowPicker(false);
                    }}
                />
            </Box>
        </Box>
    );
}

export default EmojiPicker;
