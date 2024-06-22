import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setUserId } from '../../store/feature/users.slice';

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
                }
            );
            const token = res.data.token;
            document.cookie = `token=${token}`;
            dispatch(setUserId(res.data.tempUser._id));
            return res.data.tempUser;
        } catch (error) {
            errorApi(error);
        }
    };

    return createVisitorSession;
};