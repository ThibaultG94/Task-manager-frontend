import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './feature/users.slice';
import tasksSlice from './feature/tasks.slice';
import workspacesSlice from './feature/workspaces.slice';
import editStateSlice from './feature/editState.slice';
import tipsSlice from './feature/tips.slice';
import pagesSlice from './feature/pages.slice';
import invitationsSlice from './feature/invitations.slice';

const store = configureStore({
	reducer: {
		users: usersSlice,
		tasks: tasksSlice,
		workspaces: workspacesSlice,
		editState: editStateSlice,
		tips: tipsSlice,
		pages: pagesSlice,
		invitations: invitationsSlice,
	},
});

export default store;
