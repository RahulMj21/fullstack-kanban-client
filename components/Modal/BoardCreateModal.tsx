import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    CreateBoardSchema,
    ICreateBoardInput,
} from "../../schemas/createBoardSchema";
import { createBoard } from "../../services/boards";
import { formSubmitButtonStyles } from "../../styles/theme";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import ModalLayout from "./ModalLayout";

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

const BoardCreateModal = ({ onClose, isOpen }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ICreateBoardInput>({
        resolver: zodResolver(CreateBoardSchema),
    });
    const { mutate, isLoading } = useMutation(createBoard, {
        onSuccess: async (data) => {
            if (data.success && data.data) {
                enqueueSnackbar("Board Created Successfully", {
                    variant: "success",
                });
                reset();
                router.push(`/board/${data.data._id}`);
                onClose();
            }
        },
        onError: (error: any) => {
            const errMsg = error?.response?.data?.message || error.message;
            enqueueSnackbar(errMsg, { variant: "error" });
        },
    });

    const onSubmit: SubmitHandler<ICreateBoardInput> = async (values) => {
        try {
            mutate(values);
        } catch (error) {}
    };

    return (
        <ModalLayout title="create-board" onClose={onClose} isOpen={isOpen}>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "25rem",
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
                    variant="outlined"
                    {...register("title")}
                />
                <TextField
                    error={!!errors.description}
                    label="Description"
                    helperText={
                        errors.description ? errors.description.message : null
                    }
                    variant="outlined"
                    {...register("description")}
                />
                <Button
                    sx={formSubmitButtonStyles}
                    variant="contained"
                    autoFocus
                    type="submit"
                >
                    create
                    {isLoading && <CustomCircullarProgress />}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default BoardCreateModal;
