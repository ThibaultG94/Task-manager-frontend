import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';
import EditIcon from './EditIcon';

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
		<div className="h-8 mb-2">
			{!isEditingField.title && (
				<div className="flex justify-center">
					<h2 className="mt-2 text-2xl font-bold flex-grow">
						{editedTask?.title}
					</h2>
					<EditIcon handleEditElement={handleEditTitle} />
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
					<button onClick={(e) => handleValidTitle(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditTitle(e)}>Annuler</button>
				</div>
			)}
		</div>
	);
};

export default EditTitle;
