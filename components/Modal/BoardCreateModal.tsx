import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { createBoard } from "../../services/boards";
import { styled } from "@mui/material/styles";

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
        <DialogTitle sx={{ m: 0, p: 2 }} {...props}>
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
    onClose: () => void;
    isOpen: boolean;
}

const BoardCreateModal = ({ onClose, isOpen }: Props) => {
    const { mutate, isLoading } = useMutation(createBoard);
    return (
        <BootstrapDialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="create-modal"
        >
            <BootstrapDialogTitle id="createBoard" onClose={onClose}>
                Create Board
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                    risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Vivamus sagittis lacus vel augue laoreet
                    rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent
                    commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                    fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default BoardCreateModal;
