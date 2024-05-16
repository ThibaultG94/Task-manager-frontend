import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  workspaces: [],
  isWorkspacesLoaded: false,
  singleWorkspace: null,
  editedWorkspace: null,
  loading: false,
  error: null,
};

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setWorkspacesAction: (state, action) => {
      state.isWorkspacesLoaded = true;
      state.workspaces = action.payload;
    },
    setSingleWorkspaceAction: (state, action) => {
      state.singleWorkspace = action.payload;
    },
    setInitialEditedWorkspace: (state, action) => {
      state.editedWorkspace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const {
  setWorkspacesAction,
  setSingleWorkspaceAction,
  setInitialEditedWorkspace,
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
