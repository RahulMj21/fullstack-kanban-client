export const getTokens = () => {
    const accessToken =
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : "";
    const refreshToken =
        typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : "";
    return { accessToken, refreshToken } as const;
};
