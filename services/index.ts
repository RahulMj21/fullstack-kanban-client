import { invokeApi } from "../lib/api";
import { TLoginInput } from "../schemas/loginSchema";
import { TRegisterInput } from "../schemas/registerSchema";
import { IResponse, ITokens } from "../utils/types";

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
