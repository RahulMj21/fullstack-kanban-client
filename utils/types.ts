import { AxiosInstance, Method } from "axios";

export interface IResponse {
    success: boolean;
    message?: string;
}
export interface IResponseWithData<T extends object> extends IResponse {
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

export interface IBoard {
    _id: string;
    user: { _id: string; name: string };
    icon: string;
    title: string;
    description: string;
    position?: number;
    favourite: boolean;
    createdAt: Date;
    updatedAt: Date;
}
