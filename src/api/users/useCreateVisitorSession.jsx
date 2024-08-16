import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setIsUserLoggedIn, setUserId } from '../../store/feature/users.slice';

export const useCreateVisitorSession = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const createVisitorSession = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${API_URL}/users/visitor`, 
            {},
            {
                withCredentials: true,
            });
            dispatch(setUserId(res.data.tempUser.id));
            dispatch(setIsUserLoggedIn(true));

            return res;
        } catch (error) {
            errorApi(error);
        }
    };

    return createVisitorSession;
};