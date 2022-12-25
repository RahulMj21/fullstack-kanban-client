import axios, { AxiosInstance, Method } from "axios";

const accessToken = localStorage.getItem("accessToken") || "";
const refreshToken = localStorage.getItem("refreshToken") || "";

export const $axiosV1 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "X-Refresh": refreshToken,
    },
});

export const invokeApi = async ({
    axiosInstance = $axiosV1,
    path,
    method = "GET",
    body = {},
    headers = {},
    baseURL,
}: {
    axiosInstance?: AxiosInstance;
    path: string;
    method: Method;
    body?: object;
    headers?: object;
    baseURL?: string;
}) => {
    try {
        const resp = await axiosInstance({
            baseURL,
            url: path,
            method,
            data: JSON.stringify(body),
            headers: { ...headers },
            timeout: 1000 * 60 * 3,
        });
        return resp.data;
    } catch (error) {
        throw error;
    }
};
