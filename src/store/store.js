import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './feature/users.slice';
import tasksSlice from './feature/tasks.slice';
import workspacesSlice from './feature/workspaces.slice';

const store = configureStore({
	reducer: {
		users: usersSlice,
		tasks: tasksSlice,
		workspaces: workspacesSlice,
	},
});

export default store;
