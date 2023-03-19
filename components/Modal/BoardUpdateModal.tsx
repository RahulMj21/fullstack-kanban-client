import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    TUpdateBoardInput,
    UpdateBoardSchema,
} from "../../schemas/updateBoardSchema";
import ModalLayout from "./ModalLayout";
import CustomCircullarProgress from "../common/CustomCircullarProgress";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const BoardUpdateModal = ({ isOpen, onClose }: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<TUpdateBoardInput>({
        resolver: zodResolver(UpdateBoardSchema),
    });

    const onSubmit: SubmitHandler<TUpdateBoardInput> = (values) => {
        console.log("values :", values);
    };

    return (
        <ModalLayout title="update-board" isOpen={isOpen} onClose={onClose}>
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
                    label="Desctiption"
                    error={!!errors.description}
                    helperText={
                        errors.description ? errors.description.message : null
                    }
                    variant="outlined"
                    {...register("description")}
                />
                <Button type="submit">
                    Update
                    {/* {isLoading && <CustomCircullarProgress />} */}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default BoardUpdateModal;
