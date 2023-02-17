import { invokeApi } from "../lib/api";
import { TLoginInput } from "../schemas/loginSchema";
import { TRegisterInput } from "../schemas/registerSchema";
import { getTokens } from "../utils/helper";
import { IResponse, ITokens, IUser } from "../utils/types";

export const registerUser = async (input: TRegisterInput) => {
    try {
        const resp = await invokeApi({
            path: "/register",
            method: "POST",
            body: input,
        });
        return resp as IResponse<ITokens>;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (input: TLoginInput) => {
    try {
        const resp = await invokeApi({
            path: "/login",
            method: "POST",
            body: input,
        });
        return resp as IResponse<ITokens>;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp = await invokeApi({
            path: "/me",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh": refreshToken,
            },
        });
        return resp as IResponse<IUser>;
    } catch (error) {
        throw error;
    }
};
