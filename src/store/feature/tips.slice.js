import { createSlice } from '@reduxjs/toolkit';

export const tipsSlice = createSlice({
	name: 'tips',
	initialState: {
		tips: [],
		loading: false,
		error: null,
	},
	reducers: {
		getTipsAction: (state) => {
			state.loading = true;
		},
		getTipsSuccess: (state, action) => {
			state.tips = action.payload;
			state.loading = false;
			state.error = null;
		},
		getTipsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { getTipsAction, getTipsSuccess, getTipsFailure } =
	tipsSlice.actions;
export default tipsSlice.reducer;
