import { baseAPI } from "."

export const currentUser = async () => {
    const response = await baseAPI.get('/customers');
    return response.data;
}