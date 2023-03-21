import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutoSize from "@mui/base/TextareaAutosize";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    TUpdateBoardInput,
    UpdateBoardSchema,
} from "../../schemas/updateBoardSchema";
import { getSingleBoard, updateBoard } from "../../services/boards";
import { formSubmitButtonStyles } from "../../styles/theme";
import { IGetSingleBoardResponse } from "../../utils/types";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import ModalLayout from "./ModalLayout";
import EmojiPicker from "../common/EmojiPicker";
import { useSnackbar } from "notistack";
import { QUERY_SINGLE_BOARD } from "../../utils/constants";

const TextArea = styled(TextAreaAutoSize)(({ theme }) => ({
    minHeight: "5rem",
    maxHeight: "8rem",
    minWidth: "100%",
    maxWidth: "100%",
    background: "transparent",
    padding: "0.5rem",
    borderRadius: "4px",
    fontFamily: "inherit",
    fontSize: "1rem",
    color: "#f1f1f1",
    "::placeholder": {
        color: "#b0b0b0",
    },
    outlineColor: theme.palette.info.main,
}));

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#65C466",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#4f4f4f",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const BoardUpdateModal = ({ isOpen, onClose }: Props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const boardId = router.query.boardId as string;

    const { data, isLoading, refetch } = useQuery(
        [QUERY_SINGLE_BOARD, boardId],
        () => getSingleBoard(boardId),
        {
            enabled: !!boardId,
        }
    );
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TUpdateBoardInput>({
        resolver: zodResolver(UpdateBoardSchema),
    });

    const { mutate, isLoading: isUpdateBoardLoading } = useMutation(
        updateBoard,
        {
            onSuccess: () => {
                enqueueSnackbar("Board Updated", {
                    variant: "success",
                });
                reset();
                refetch();
                onClose();
            },
            onError: () => {
                enqueueSnackbar("Failed to Update Board", {
                    variant: "error",
                });
            },
        }
    );
    console.log("errors :", errors);

    const onSubmit: SubmitHandler<TUpdateBoardInput> = (values) => {
        console.log("values :", values);
        mutate({ boardId, reqBody: values });
    };

    return (
        <ModalLayout title="update-board" isOpen={isOpen} onClose={onClose}>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "28rem",
                    maxWidth: "100%",
                    gap: "1.5rem",
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    error={!!errors.title}
                    label="Title"
                    helperText={errors.title ? errors.title.message : null}
                    variant="standard"
                    defaultValue={data?.title}
                    {...register("title")}
                />
                <Box width="100%">
                    <Typography mb="0.3rem" fontSize="0.75rem" color="#c2c1c1">
                        Description
                    </Typography>
                    <TextArea
                        placeholder="Description"
                        defaultValue={data?.description}
                        {...register("description")}
                    />
                </Box>
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    Click on the icon to Update :{" "}
                    <EmojiPicker
                        registerKey="icon"
                        setValue={setValue}
                        icon={data?.icon}
                    />
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <FormLabel htmlFor="favourite">
                        Add or Remove from Favourite :
                    </FormLabel>
                    <IOSSwitch
                        defaultChecked={data?.favourite}
                        id="favourite"
                        color="warning"
                        {...register("favourite")}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={formSubmitButtonStyles}
                >
                    Update
                    {(isLoading || isUpdateBoardLoading) && (
                        <CustomCircullarProgress />
                    )}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default BoardUpdateModal;
