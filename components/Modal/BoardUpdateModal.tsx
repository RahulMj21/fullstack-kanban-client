import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    TUpdateBoardInput,
    UpdateBoardSchema,
} from "../../schemas/updateBoardSchema";
import { getSingleBoard, updateBoard } from "../../services/boards";
import { formSubmitButtonStyles } from "../../styles/theme";
import {
    QUERY_FAVOURITE_BOARDS,
    QUERY_MY_BOARDS,
    QUERY_SINGLE_BOARD,
} from "../../utils/constants";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import EmojiPicker from "../common/EmojiPicker";
import { CustomTextArea, IOSSwitch } from "../CustomStyledComponents/Inputs";
import ModalLayout from "./ModalLayout";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const BoardUpdateModal = ({ isOpen, onClose }: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();
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
                queryClient.invalidateQueries({
                    queryKey: [QUERY_MY_BOARDS],
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_FAVOURITE_BOARDS],
                });
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

    const onSubmit: SubmitHandler<TUpdateBoardInput> = (values) => {
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
                    <CustomTextArea
                        placeholder="Description"
                        defaultValue={data?.description}
                        {...register("description")}
                    />
                    <Typography fontSize="0.75rem" color="crimson">
                        {errors.description?.message}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#c2c1c1",
                    }}
                >
                    Click on the icon to Update :
                    <EmojiPicker
                        registerKey="icon"
                        setValue={setValue}
                        icon={data?.icon}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <FormLabel
                        htmlFor="favourite"
                        style={{ color: "#c2c1c1", cursor: "pointer" }}
                    >
                        Add or Remove from Favourite :
                    </FormLabel>
                    <IOSSwitch
                        defaultChecked={data?.favourite}
                        id="favourite"
                        color="warning"
                        onChange={(e) =>
                            e.target.checked
                                ? setValue("favourite", true)
                                : setValue("favourite", false)
                        }
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
