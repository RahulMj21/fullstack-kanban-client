import { invokeApi } from "../lib/api";
import { CreateBoardInput } from "../schemas/createBoardSchema";
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

export const createBoard = async (body: CreateBoardInput) => {
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
