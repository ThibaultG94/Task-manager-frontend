import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditDescription = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputDescriptionRef = useRef(null);

	const handleEditDescription = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({
				field: 'description',
				value: !isEditingField.description,
			})
		);
	};

	useEffect(() => {
		if (isEditingField.description) {
			inputDescriptionRef.current.focus();
		}
	}, [isEditingField.description]);

	const handleValidDescription = (e) => {
		e.stopPropagation();
		const newDescription = inputDescriptionRef.current.value;
		if (editedTask.description !== newDescription) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ description: newDescription }));
		}
		dispatch(setEditingField({ field: 'description', value: false }));
	};

	return (
		<div className="flex flex-wrap mb-2">
			{!isEditingField.description && (
				<div className="description-icon mt-2 px-2 py-1 rounded-lg">
					<span className="ml-3 text-xl">
						{editedTask?.description}
					</span>
				</div>
			)}
			{isEditingField.description && (
				<>
					<textarea
						className="task-edit-description"
						defaultValue={editedTask?.description}
						ref={inputDescriptionRef}
					/>
					<button onClick={(e) => handleValidDescription(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditDescription(e)}>
						Annuler
					</button>
				</>
			)}
			{/* {!isEditingField.description && (
				<span
				className="edit-icon"
				onClick={(e) => handleEditDescription(e)}></span>
			)} */}
		</div>
	);
};

export default EditDescription;
