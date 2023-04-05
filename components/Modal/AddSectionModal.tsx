import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateBoardSchema } from "../../schemas/createBoardSchema";
import { TCreateSectionInput } from "../../schemas/createSectionSchema";
import { createSection } from "../../services/section";
import { formSubmitButtonStyles } from "../../styles/theme";
import { QUERY_SINGLE_BOARD } from "../../utils/constants";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import ModalLayout from "./ModalLayout";

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

const AddSectionModal = ({ onClose, isOpen }: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const boardId = router.query.boardId as string;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TCreateSectionInput>({
        resolver: zodResolver(CreateBoardSchema),
    });

    const { mutate, isLoading } = useMutation(createSection, {
        onSuccess: () => {
            enqueueSnackbar("Section Added", {
                variant: "success",
            });
            reset();
            queryClient.invalidateQueries({
                queryKey: [QUERY_SINGLE_BOARD, boardId],
            });
            onClose();
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.message
                ? error.response.data.message
                : error.message;
            enqueueSnackbar(msg, {
                variant: "error",
            });
        },
    });

    const onSubmit: SubmitHandler<TCreateSectionInput> = async (values) => {
        try {
            const reqBody = { title: values.title };
            mutate({ boardId, reqBody });
        } catch (error) {}
        console.log(values);
    };

    return (
        <ModalLayout title="create-section" onClose={onClose} isOpen={isOpen}>
            <FormControl
                sx={{ width: "22rem", maxWidth: "100%" }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    error={!!errors.title}
                    label="Title"
                    helperText={errors.title ? errors.title.message : null}
                    variant="outlined"
                    {...register("title")}
                    sx={{ my: "1rem" }}
                />
                <Button
                    sx={formSubmitButtonStyles}
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                >
                    create
                    {isLoading && <CustomCircullarProgress />}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default AddSectionModal;
