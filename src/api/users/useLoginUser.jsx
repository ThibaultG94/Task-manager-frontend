import axios from "axios";
import { useGetUserId } from "./useGetUserId";
import { useDispatch } from "react-redux";
import { setIsUserLoggedIn } from "../../store/feature/users.slice";

export const useLoginUser = () => {
    const dispatch = useDispatch();
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

            dispatch(setIsUserLoggedIn(true));

            await getUserId();
            return res;
        } catch (error) {
            console.error(error);
        }

    };

    return login;
};