import { createSlice } from '@reduxjs/toolkit';

export const workspacesSlice = createSlice({
	name: 'workspaces',
	initialState: {
		workspaces: [],
		singleWorkspace: null,
		editedWorkspace: null,
		loading: false,
		error: null,
	},
	reducers: {
		setWorkspaces: (state) => {
			state.loading = true;
		},
		setWorkspacesSuccess: (state, action) => {
			state.loading = false;
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
		createWorkspaceAction: (state) => {
			state.loading = true;
		},
		createWorkspaceSuccess: (state, action) => {
			state.loading = false;
			state.workspaces.push(action.payload);
			state.error = null;
		},
		createWorkspaceFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		editWorkspaceAction: (state) => {
			state.loading = true;
		},
		editWorkspaceSuccess: (state, action) => {
			state.loading = false;
			state.workspaces = state.workspaces.map((workspace) =>
				workspace.id === action.payload.id ? action.payload : workspace
			);
			state.error = null;
		},
		editWorkspaceFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteWorkspaceAction: (state) => {
			state.loading = true;
		},
		deleteWorkspaceSuccess: (state, action) => {
			state.loading = false;
			state.workspaces = state.workspaces.filter(
				(workspace) => workspace.id !== action.payload
			);
			state.error = null;
		},
		deleteWorkspaceFailed: (state, action) => {
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
	createWorkspaceAction,
	createWorkspaceSuccess,
	createWorkspaceFailed,
	editWorkspaceAction,
	editWorkspaceSuccess,
	editWorkspaceFailed,
	deleteWorkspaceAction,
	deleteWorkspaceSuccess,
	deleteWorkspaceFailed,
	setInitialEditedWorkspace,
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
