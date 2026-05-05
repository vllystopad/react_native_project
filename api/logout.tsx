import { baseAPI } from "."

export const logout = async () => {
    const response = await baseAPI.post('/auth/logout');
    return response.data; 
}