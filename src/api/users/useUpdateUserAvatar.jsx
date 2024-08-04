import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useUpdateUserAvatar = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const updateUserAvatar = async (userId, imageId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.put(`${API_URL}/users/${userId}/avatar`, {
                avatar: imageId,
            }, {
                withCredentials: true,
            });
            dispatch(setUserData(res.data.user));
            return res.data.user;
        } catch (error) {
            errorApi(error);
        }
    };

    return updateUserAvatar;
};