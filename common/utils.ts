export const getAccessToken = (token: string) => {
    return token.replace(/^Bearer\s+/i, '');
}