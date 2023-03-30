import { invokeApi } from "../lib/api";
import { getTokens } from "../utils/helper";
import { ICreateSectionReqBody, IResponse } from "../utils/interfaces";

export const createSection = async ({
    reqBody,
    boardId,
}: {
    boardId: string;
    reqBody: ICreateSectionReqBody;
}) => {
    try {
        const { accessToken, refreshToken } = getTokens();
        const resp: IResponse = await invokeApi({
            path: `/sections/${boardId}`,
            method: "POST",
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
export const updateSection = async ({
    reqBody,
    sectionId,
}: {
    sectionId: string;
    reqBody: ICreateSectionReqBody;
}) => {
    try {
        const { accessToken, refreshToken } = getTokens();
        const resp: IResponse = await invokeApi({
            path: `/sections/${sectionId}`,
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

export const deleteSection = async ({ sectionId }: { sectionId: string }) => {
    try {
        const { accessToken, refreshToken } = getTokens();
        const resp: IResponse = await invokeApi({
            path: `/sections/${sectionId}`,
            method: "DELETE",
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
