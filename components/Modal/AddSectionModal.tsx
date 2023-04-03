import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateBoardSchema } from "../../schemas/createBoardSchema";
import { TCreateSectionInput } from "../../schemas/createSectionSchema";
import { formSubmitButtonStyles } from "../../styles/theme";
import CustomCircullarProgress from "../common/CustomCircullarProgress";
import ModalLayout from "./ModalLayout";

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

const AddSectionModal = ({ onClose, isOpen }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCreateSectionInput>({
        resolver: zodResolver(CreateBoardSchema),
    });

    const onSubmit: SubmitHandler<TCreateSectionInput> = async (values) => {
        console.log(values);
    };

    return (
        <ModalLayout title="create-board" onClose={onClose} isOpen={isOpen}>
            <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={!!errors.title}
                    label="Title"
                    helperText={errors.title ? errors.title.message : null}
                    variant="standard"
                    {...register("title")}
                />
                <Button
                    sx={formSubmitButtonStyles}
                    variant="contained"
                    autoFocus
                    type="submit"
                >
                    create
                    {/* {isLoading && <CustomCircullarProgress />} */}
                </Button>
            </FormControl>
        </ModalLayout>
    );
};

export default AddSectionModal;
