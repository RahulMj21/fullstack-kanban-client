import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomCircullarProgress from "../components/common/CustomCircullarProgress";
import AuthLayout from "../components/layout/AuthLayout";
import { LoginSchema, TLoginInput } from "../schemas/loginSchema";
import { loginUser } from "../services";
import { authSubmitButtonStyles, formStyles } from "../styles/theme";

const Login = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TLoginInput>({ resolver: zodResolver(LoginSchema) });

    const onSubmit = async (values: TLoginInput) => {
        try {
            setIsLoading(true);
            const resp = await loginUser(values);
            if (resp.data) {
                localStorage.setItem("accessToken", resp.data.accessToken);
                localStorage.setItem("refreshToken", resp.data.refreshToken);
                enqueueSnackbar("Logged In Successfully", {
                    variant: "success",
                });
                reset();
                router.push("/");
            }
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="login">
            <FormControl
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={formStyles}
            >
                <TextField
                    type="email"
                    error={!!errors.email}
                    label="Email"
                    helperText={errors.email ? errors.email.message : null}
                    variant="standard"
                    {...register("email")}
                />
                <TextField
                    type="password"
                    error={!!errors.password}
                    label="Password"
                    helperText={
                        errors.password ? errors.password.message : null
                    }
                    variant="standard"
                    {...register("password")}
                />
                <Button
                    sx={authSubmitButtonStyles}
                    type="submit"
                    variant="contained"
                >
                    Submit
                    {isLoading && <CustomCircullarProgress />}
                </Button>
                <NextLink
                    href="/register"
                    passHref
                    style={{
                        display: "inline-block",
                        marginLeft: "auto",
                        color: "skyblue",
                    }}
                >
                    {"Don't have an account?"}
                </NextLink>
            </FormControl>
        </AuthLayout>
    );
};

export default Login;
