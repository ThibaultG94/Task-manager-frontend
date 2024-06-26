import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  conversations: [],
  isConversationsLoaded: false,
  loading: false,
  error: null,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.isConversationsLoaded = true;
    },
    addMessageToConversation: (state, action) => {
      const { conversationId, msg } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (conv) => conv._id === conversationId
      );
      if (conversationIndex !== -1) {
        state.conversations[conversationIndex].updatedAt =
          new Date().toISOString();
        state.conversations[conversationIndex].messages = [
          ...state.conversations[conversationIndex].messages,
          msg,
        ];
      } else {
        const senderUser = { _id: msg.senderId, username: msg.senderUsername };
        const guestUser = { _id: msg.guestId, username: msg.guestUsername };
        // create a new conversation
        const newConversation = {
          _id: conversationId,
          messages: [msg],
          updatedAt: new Date().toISOString(),
          users: [senderUser, guestUser],
          lastMessage: msg._id,
        };
        state.conversations.push(newConversation);
      }
    },
    markConversationAsRead: (state, action) => {
      const { conversationId, userId } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv._id === conversationId
      );
      if (conversation) {
        conversation.messages.forEach((msg) => {
          if (msg.guestId === userId) {
            msg.read = true;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const {
  setConversations,
  addMessageToConversation,
  markConversationAsRead,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
