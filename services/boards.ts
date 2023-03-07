import { invokeApi } from "../lib/api";
import { ICreateBoardInput } from "../schemas/createBoardSchema";
import { getTokens } from "../utils/helper";
import { IBoard, IResponseWithData } from "../utils/types";

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

export const getSingleBoard = async (boardId: string) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IBoard> = await invokeApi({
            path: `/boards/${boardId}`,
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

export const updateBoardPosition = async (body: { _id: string }[]) => {
    try {
        const { accessToken, refreshToken } = getTokens();

        const resp: IResponseWithData<IBoard> = await invokeApi({
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
