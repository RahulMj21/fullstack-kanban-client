import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutoSize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    TUpdateBoardInput,
    UpdateBoardSchema,
} from "../../schemas/updateBoardSchema";
import { updateBoard } from "../../services/boards";
import { formSubmitButtonStyles } from "../../styles/theme";
import { IGetSingleBoardResponse } from "../../utils/types";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import ModalLayout from "./ModalLayout";

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
interface Props {
    isOpen: boolean;
    onClose: () => void;
    data?: IGetSingleBoardResponse;
}

const BoardUpdateModal = ({ isOpen, onClose, data }: Props) => {
    const router = useRouter();
    const id = router.query.id as string;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<TUpdateBoardInput>({
        resolver: zodResolver(UpdateBoardSchema),
    });

    const { mutate, isLoading } = useMutation(updateBoard);

    const onSubmit: SubmitHandler<TUpdateBoardInput> = (values) => {
        console.log("values :", values);
        mutate({ id, reqBody: values });
    };

    return (
        <ModalLayout title="update-board" isOpen={isOpen} onClose={onClose}>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "32rem",
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
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={formSubmitButtonStyles}
                >
                    Update
                    {isLoading && <CustomCircullarProgress />}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default BoardUpdateModal;
