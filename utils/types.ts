import { AxiosInstance, Method } from "axios";

export interface IResponse<T extends object> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserState {
    user: IUser | null;
    isAuthenticated: boolean;
}

export interface IInvokeApi {
    axiosInstance?: AxiosInstance;
    path: string;
    method?: Method;
    body?: object;
    headers?: object;
    baseURL?: string;
}
