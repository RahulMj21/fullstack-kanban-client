import { invokeApi } from "../lib/api";
import { TLoginInput } from "../schemas/loginSchema";
import { TRegisterInput } from "../schemas/registerSchema";
import { getTokens } from "../utils/helper";
import {
    IResponse,
    IResponseWithData,
    ITokens,
    IUser,
} from "../utils/interfaces";

export const registerUser = async (input: TRegisterInput) => {
    try {
        const resp: IResponseWithData<ITokens> = await invokeApi({
            path: "/users/register",
            method: "POST",
            body: input,
        });
        return resp;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (input: TLoginInput) => {
    try {
        const resp: IResponseWithData<ITokens> = await invokeApi({
            path: "/users/login",
            method: "POST",
            body: input,
        });
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IUser> = await invokeApi({
            path: "/users/me",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh": refreshToken,
            },
        });
        return resp;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponse = await invokeApi({
            path: "/users/logout",
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh": refreshToken,
            },
        });
        return resp;
    } catch (error) {
        throw error;
    }
};
