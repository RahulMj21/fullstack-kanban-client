import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { ReactNode } from "react";

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
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface Props {
    children: ReactNode;
    title: string;
    onClose: () => void;
    isOpen: boolean;
}

const ModalLayout = ({ title, onClose, isOpen, children }: Props) => {
    return (
        <BootstrapDialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby={title}
        >
            <BootstrapDialogTitle id={title} onClose={onClose}>
                {title.replaceAll("-", " ")}
            </BootstrapDialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </BootstrapDialog>
    );
};

export default ModalLayout;
