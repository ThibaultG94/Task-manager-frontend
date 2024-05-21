import { createSelector } from "@reduxjs/toolkit";

const selectCommentsState = (state) => state.comments;

export const selectComments = createSelector(
  [selectCommentsState],
  (comments) => comments.comments
);
