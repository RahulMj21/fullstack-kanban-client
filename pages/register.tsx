import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import CustomCircullarProgress from "../components/common/CustomCircullarProgress";
import AuthLayout from "../components/layout/AuthLayout";
import { RegisterSchema, TRegisterInput } from "../schemas/registerSchema";
import { registerUser } from "../services/users";
import { formSubmitButtonStyles, formStyles } from "../styles/theme";

const Register = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TRegisterInput>({ resolver: zodResolver(RegisterSchema) });
    const { mutate, isLoading } = useMutation(registerUser, {
        onSuccess: (resp) => {
            if (resp.data) {
                localStorage.setItem("accessToken", resp.data.accessToken);
                localStorage.setItem("refreshToken", resp.data.refreshToken);
                enqueueSnackbar("Registered Successfully", {
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

    const onSubmit = async (values: TRegisterInput) => {
        try {
            mutate(values);
        } catch (error: any) {
            throw error;
        }
    };

    return (
        <AuthLayout title="register">
            <FormControl
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={formStyles}
            >
                <TextField
                    error={!!errors.name}
                    label="Name"
                    helperText={errors.name ? errors.name.message : null}
                    variant="standard"
                    {...register("name")}
                />
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
                <TextField
                    type="password"
                    error={!!errors.confirmPassword}
                    label="Confirm Password"
                    helperText={
                        errors.confirmPassword
                            ? errors.confirmPassword.message
                            : null
                    }
                    variant="standard"
                    {...register("confirmPassword")}
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
                    href="/login"
                    style={{
                        display: "inline-block",
                        marginLeft: "auto",
                        color: "skyblue",
                    }}
                >
                    Already have an account?
                </NextLink>
            </FormControl>
        </AuthLayout>
    );
};

export default Register;
