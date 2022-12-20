import { Button, FormControl } from "@mui/material";
import { FormEvent } from "react";
import AuthLayout from "../components/layout/AuthLayout";

const formStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
};

const Login = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <AuthLayout title="login">
            <FormControl
                onSubmit={handleSubmit}
                component="form"
                sx={formStyles}
            >
                <Button
                    sx={{ borderRadius: "0.5rem", boxShadow: "none" }}
                    variant="contained"
                >
                    Submit
                </Button>
            </FormControl>
        </AuthLayout>
    );
};

export default Login;
