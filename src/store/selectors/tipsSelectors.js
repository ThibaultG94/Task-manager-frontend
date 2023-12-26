import { createSelector } from '@reduxjs/toolkit';

const selectTipsState = (state) => state.tips;

export const selectTips = createSelector(
	[selectTipsState],
	(tips) => tips.tips
);
