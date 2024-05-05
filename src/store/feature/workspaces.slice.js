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
});

export const {
  setWorkspacesAction,
  setSingleWorkspaceAction,
  setInitialEditedWorkspace,
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
