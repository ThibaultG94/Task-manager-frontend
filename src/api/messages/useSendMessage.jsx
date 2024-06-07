import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { addMessageToConversation } from '../../store/feature/conversations.slice';

export const useSendMessage = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const sendMessage = async (msg, conversationId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/messages/`,
				{
					senderId: msg.senderId,
					guestId: msg.guestId,
					message: msg.message,
					conversationId,
				},
				{
					withCredentials: true,
				}
			);
            dispatch(addMessageToConversation({ conversationId, msg: { ...msg, createdAt: new Date().toISOString(), content: msg.message }}));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return sendMessage;
};
