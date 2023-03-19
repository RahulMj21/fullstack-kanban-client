import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Props {
    icon?: string;
}

const EmojiPicker = ({ icon }: Props) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string>();
    const [isShowPicker, setIsShowPicker] = useState(false);

    const handleSelectEmoji = ({ native }: { native: string }) => {
        setSelectedEmoji(native);
    };

    useEffect(() => {
        if (icon) setSelectedEmoji(icon);
    }, [icon]);

    return (
        <Box sx={{ position: "relative" }}>
            <Typography
                variant="h4"
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
};

export default EmojiPicker;
