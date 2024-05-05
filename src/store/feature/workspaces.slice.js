import { createSlice } from "@reduxjs/toolkit";

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: {
    workspaces: [],
    isWorkspacesLoaded: false,
    singleWorkspace: null,
    editedWorkspace: null,
    loading: false,
    error: null,
  },
  reducers: {
    setWorkspaces: (state) => {
      state.isWorkspacesLoaded = false;
    },
    setWorkspacesSuccess: (state, action) => {
      state.isWorkspacesLoaded = true;
      state.workspaces = action.payload;
      state.error = null;
    },
    setWorkspacesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSingleWorkspace: (state) => {
      state.loading = true;
    },
    setSingleWorkspaceSuccess: (state, action) => {
      state.loading = false;
      state.singleWorkspace = action.payload;
      state.error = null;
    },
    setSingleWorkspaceFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setInitialEditedWorkspace: (state, action) => {
      state.editedWorkspace = action.payload;
    },
  },
});

export const {
  setWorkspaces,
  setWorkspacesSuccess,
  setWorkspacesFailed,
  setSingleWorkspace,
  setSingleWorkspaceSuccess,
  setSingleWorkspaceFailed,
  setInitialEditedWorkspace,
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
