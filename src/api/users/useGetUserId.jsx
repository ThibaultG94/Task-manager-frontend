import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/selectors/userSelectors";
import { setUserId } from "../../store/feature/users.slice";
import axios from "axios";

export const useGetUserId = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const selectedUserId = useSelector(selectUserId);

    const getUserId = async () => {
        let userId;
        if (selectedUserId) {
            userId = selectedUserId;
            return selectedUserId;
        } else {
            const res = await axios.get(`${API_URL}/users/my-account`, {
                withCredentials: true,
            });
            if (res.status !== 200) {
                throw new Error(res.data);
            }
            userId = res.data.user._id;
            dispatch(setUserId(res.data.user._id));
            return res.data.user._id;
        }
    };

    return getUserId;
};