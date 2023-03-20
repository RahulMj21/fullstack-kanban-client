import axios from "axios";
import { invokeApi } from "../lib/api";
import { ICreateBoardInput } from "../schemas/createBoardSchema";
import { TUpdateBoardInput } from "../schemas/updateBoardSchema";
import { getTokens } from "../utils/helper";
import {
    IBoard,
    IGetSingleBoardResponse,
    IResponse,
    IResponseWithData,
} from "../utils/types";

export const getAllBoards = async () => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IBoard[]> = await invokeApi({
            path: "/boards",
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

export const getMyBoards = async (userId: string) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IBoard[]> = await invokeApi({
            path: `/boards/user/${userId}`,
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

export const getSingleBoard = async (boardId: string) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IGetSingleBoardResponse> =
            await invokeApi({
                path: `/boards/${boardId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh": refreshToken,
                },
            });
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createBoard = async (body: ICreateBoardInput) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IBoard> = await invokeApi({
            path: "/boards/create",
            method: "POST",
            body,
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

export const updateBoardPosition = async (body: {
    boards: { _id: string }[];
}) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponse = await invokeApi({
            path: "/boards/update-position",
            method: "PUT",
            body,
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

export const updateBoard = async ({
    id,
    reqBody,
}: {
    id: string;
    reqBody: TUpdateBoardInput;
}) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponse = await invokeApi({
            path: `/boards/${id}`,
            method: "PUT",
            body: reqBody,
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
