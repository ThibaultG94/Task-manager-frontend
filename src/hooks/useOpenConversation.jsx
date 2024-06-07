import { useDispatch, useSelector } from "react-redux";
import { minimizeWindow, openWindow } from "../store/feature/conversationWindows.slice";
import { selectConversationWindows } from "../store/selectors/conversationWindowsSelectors";
import { selectConversations } from "../store/selectors/conversationsSelectors";
import { useMarkConversationAsRead } from "../api/conversations/useMarkConversationAsRead";

const useOpenConversation = () => {
    const dispatch = useDispatch();
    const conversationWindows = useSelector(selectConversationWindows);
    const conversations = useSelector(selectConversations);

    const readConversation = useMarkConversationAsRead();

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
            readConversation(conv._id);
          });
    };

    return openConversation;
};

export default useOpenConversation;
