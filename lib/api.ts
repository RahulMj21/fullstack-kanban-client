import axios from "axios";
import { IInvokeApi } from "../utils/types";

const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
const refreshToken =
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : "";

export const $axiosV1 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
}: IInvokeApi) => {
    try {
        const resp = await axiosInstance({
            baseURL,
            url: path,
            method,
            data: body,
            headers: { ...headers },
            timeout: 1000 * 60 * 3,
        });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

const interceptor = $axiosV1.interceptors.response.use(
    (config) => config,
    async function (error) {
        if (error.response.status === 401) {
            $axiosV1.interceptors.response.eject(interceptor);

            const resp = await invokeApi({ path: "/refresh" });
            if (resp?.data?.accessToken) {
                localStorage.setItem("accessToken", resp.data.accessToken);
                error.config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
            }
            return $axiosV1(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);
