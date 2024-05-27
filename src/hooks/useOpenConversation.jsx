import { useDispatch, useSelector } from "react-redux";
import { minimizeWindow, openWindow } from "../store/feature/conversationWindows.slice";
import { selectConversationWindows } from "../store/selectors/conversationWindowsSelectors";

const useOpenConversation = () => {
    const dispatch = useDispatch();
    const conversationWindows = useSelector(selectConversationWindows);

    const openConversation = (e, contact) => {
        e.stopPropagation();
        const existingWindow = conversationWindows.find(window => window.contact.id === contact.id);
        if (existingWindow) {
            if (existingWindow.isMinimized) {
                dispatch(minimizeWindow({ contactId: contact.id }));
            } else {
                dispatch(minimizeWindow({ contactId: contact.id }));
            }
        } else {
            dispatch(openWindow({ contact }));
        }
    };

    return openConversation;
};

export default useOpenConversation;