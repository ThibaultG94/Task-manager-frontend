import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserContacts } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

const useDeleteContact = () => {
    const dispatch = useDispatch();
	const errorApi = useErrorApi();

    const deleteContact = async (contactId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.delete(`${API_URL}/users/${contactId}/delete-contact`, {
                withCredentials: true,
            });
            dispatch(setUserContacts(res.data.userContacts));
        } catch (error) {
            errorApi(error);
        }
    }

    return deleteContact;
};

export default useDeleteContact;