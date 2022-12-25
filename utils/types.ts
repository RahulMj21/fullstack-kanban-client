export interface IResponse<T extends object> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
