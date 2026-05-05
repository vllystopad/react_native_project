import { baseAPI } from "."

export const currentUser = async () => {
    const response = await baseAPI.get('/customers/me');
    return response.data;
}