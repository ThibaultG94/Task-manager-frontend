import { useDispatch, useSelector } from "react-redux";
import { minimizeWindow, openWindow } from "../store/feature/conversationWindows.slice";
import { selectConversationWindows } from "../store/selectors/conversationWindowsSelectors";
import { selectConversations } from "../store/selectors/conversationsSelectors";
import { markConversationAsRead } from "../store/feature/conversations.slice";
import { useSocket } from "../context/SocketContext";
import getUserId from "../api/users/getUserId";

const useOpenConversation = () => {
    const dispatch = useDispatch();
    const conversationWindows = useSelector(selectConversationWindows);
    const conversations = useSelector(selectConversations);
    const { socket } = useSocket();

    const markAsRead = async (conversationId) => {
        const userId = await getUserId();
        dispatch(markConversationAsRead({ conversationId, userId }));
		socket.emit('read_message', { conversationId, userId });
    };

    const openConversation = (e, contact) => {
        e.stopPropagation();
        const existingWindow = conversationWindows.find(window => window.contact.id === contact.id);
        if (existingWindow) {
            dispatch(minimizeWindow({ contactId: contact.id }));
        } else {
            dispatch(openWindow({ contact }));
        }
        const contactConversations = conversations.filter((conv) => {
            return conv.users.some((user) => {
              return user._id === contact.id;
            });
          });
        
          contactConversations.forEach((conv) => {
            markAsRead(conv._id);
          });
    };

    return openConversation;
};

export default useOpenConversation;