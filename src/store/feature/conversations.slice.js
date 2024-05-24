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
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(
        (convo) => convo._id === conversationId
      );
      if (conversation) {
        conversation.messages.push(message);
        conversation.lastMessage = message.content;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setConversations, addMessageToConversation } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;
