import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import CustomCircullarProgress from "../components/common/CustomCircullarProgress";
import AuthLayout from "../components/layout/AuthLayout";
import { LoginSchema, TLoginInput } from "../schemas/loginSchema";
import { loginUser } from "../services/users";
import { formSubmitButtonStyles, formStyles } from "../styles/theme";

const Login = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TLoginInput>({ resolver: zodResolver(LoginSchema) });
    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (resp) => {
            if (resp.data) {
                localStorage.setItem("accessToken", resp.data.accessToken);
                localStorage.setItem("refreshToken", resp.data.refreshToken);
                enqueueSnackbar("Logged In Successfully", {
                    variant: "success",
                });
                reset();
                router.push("/");
            }
        },
        onError: (error: any) => {
            const errMsg = error?.response?.data?.message || error.message;
            enqueueSnackbar(errMsg, { variant: "error" });
        },
    });

    const onSubmit = async (values: TLoginInput) => {
        try {
            mutate(values);
        } catch (error: any) {
            throw error;
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
                    sx={formSubmitButtonStyles}
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
