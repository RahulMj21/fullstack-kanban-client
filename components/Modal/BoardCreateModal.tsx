import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, setBoards } from "../../features/boardSlice";
import {
    CreateBoardInput,
    CreateBoardSchema,
} from "../../schemas/createBoardSchema";
import { createBoard } from "../../services/boards";
import { formSubmitButtonStyles } from "../../styles/theme";
import CustomCircullarProgress from "../common/CustomCircullarProgress";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = ({
    children,
    onClose,
    ...props
}: DialogTitleProps) => {
    return (
        <DialogTitle
            sx={{ m: 0, p: 2, textTransform: "capitalize" }}
            {...props}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface Props {
    title: string;
    onClose: () => void;
    isOpen: boolean;
}

const BoardCreateModal = ({ title, onClose, isOpen }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateBoardInput>({
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

    const onSubmit: SubmitHandler<CreateBoardInput> = async (values) => {
        try {
            mutate(values);
        } catch (error) {}
    };

    return (
        <BootstrapDialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby={title}
        >
            <BootstrapDialogTitle id={title} onClose={onClose}>
                {title.replaceAll("-", " ")}
            </BootstrapDialogTitle>
            <DialogContent dividers>
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
                            errors.description
                                ? errors.description.message
                                : null
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
            </DialogContent>
        </BootstrapDialog>
    );
};

export default BoardCreateModal;
