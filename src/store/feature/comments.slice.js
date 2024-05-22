import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  comments: [],
  isCommentsLoaded: false,
  editedComment: null,
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    },
    setEditedComment: (state, action) => {
      state.editedComment = action.payload;
    },
    resetComments: (state) => {
      state.comments = [];
      state.isCommentsLoaded = false;
      state.editedComment = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setComments, setEditedComment, resetComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
