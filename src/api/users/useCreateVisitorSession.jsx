import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCreateVisitorSession = () => {
    const errorApi = useErrorApi();

    const createVisitorSession = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${API_URL}/users/visitor`);
            const token = res.data.token;
            document.cookie = `token=${token}`;
            return res.data.tempUser;
        } catch (error) {
            errorApi(error);
        }
    };

    return createVisitorSession;
};