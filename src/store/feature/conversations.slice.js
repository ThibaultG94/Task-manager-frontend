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
        state.conversations[conversationIndex].messages = [
          ...state.conversations[conversationIndex].messages,
          msg,
        ];
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
