import axios from "axios";
import { useGetUserId } from "./useGetUserId";

export const useLoginUser = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const getUserId = useGetUserId();

    const login = async (API_URL, email, password) => {
        try {
            const res = await axios.post(
                `${API_URL}/users/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
    
            const token = res.data.token;
            const refreshToken = res.data.refreshToken;
            document.cookie = `token=${token}`;
            document.cookie = `refreshToken=${refreshToken}`;

            console.log("loginUser -> res", res);

            await getUserId();
            return res;
        } catch (error) {
            console.error(error);
        }

    };

    return login;
};