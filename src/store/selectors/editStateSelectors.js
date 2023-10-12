import { createSelector } from '@reduxjs/toolkit';

const selectEditState = (state) => state.editState;

export const selectIsEditing = createSelector(
	[selectEditState],
	(editState) => editState.isEditing
);

export const selectIsEditingField = createSelector(
	[selectEditState],
	(editState) => editState.isEditing
);

export const selectHasEdited = createSelector(
	[selectEditState],
	(editState) => editState.hasEdited
);

export const selectHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.hasBeenUpdated
);
