import { createSelector } from "@reduxjs/toolkit";

export const selectConversationsState = (state) => state.conversations;

export const selectConversations = createSelector(
  [selectConversationsState],
  (conversationsState) => conversationsState.conversations
);

export const selectConversationByContactId = (state, contactId) => {
  return createSelector([selectConversations], (conversations) =>
    conversations.find((conversation) =>
      conversation.users.some((user) => user._id === contactId)
    )
  )(state);
};
