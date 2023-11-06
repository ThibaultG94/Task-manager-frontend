import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';
import ValidOrCancelButtonsInEditingMode from './ValidOrCancelButtonsInEditingMode';

const EditTitle = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputTitleRef = useRef(null);

	const handleEditTitle = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({ field: 'title', value: !isEditingField.title })
		);
	};

	useEffect(() => {
		if (isEditingField.title) {
			inputTitleRef.current.focus();
		}
	}, [isEditingField.title]);

	const handleValidTitle = (e) => {
		e.stopPropagation();
		const newTitle = inputTitleRef.current.value;
		if (editedTask.title !== newTitle) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ title: newTitle }));
		}
		dispatch(setEditingField({ field: 'title', value: false }));
	};

	return (
		<div className="mb-6">
			{!isEditingField.title && (
				<div className="text-center">
					<p className="mt-3 text-2xl font-normal flex-grow">
						{editedTask?.title}
					</p>
				</div>
			)}
			{isEditingField.title && (
				<div className="flex justify-center">
					<input
						type="text"
						maxLength={60}
						className="mt-2 text-2xl font-bold flex-grow"
						defaultValue={editedTask?.title}
						ref={inputTitleRef}
					/>
					<ValidOrCancelButtonsInEditingMode
						handleValidElement={handleValidTitle}
						handleEditElement={handleEditTitle}
					/>
				</div>
			)}
		</div>
	);
};

export default EditTitle;
