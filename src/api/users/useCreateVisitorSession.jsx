import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setIsUserLoggedIn, setUserId } from '../../store/feature/users.slice';
import { useGetUserId } from './useGetUserId';

export const useCreateVisitorSession = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();
    const getUserId = useGetUserId();

    const createVisitorSession = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${API_URL}/users/visitor`, 
            {});
            const token = res.data.token;
            const refreshToken = res.data.refreshToken;
            document.cookie = `token=${token}`;
            document.cookie = `refreshToken=${refreshToken}`;
            dispatch(setUserId(res.data.tempUser.id));
            dispatch(setIsUserLoggedIn(true));

            // await getUserId();
            return res;
        } catch (error) {
            errorApi(error);
        }
    };

    return createVisitorSession;
};