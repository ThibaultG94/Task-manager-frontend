import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditDescription = ({ editedDescription, setEditedDescription }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
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
		if (editedDescription !== newDescription) {
			dispatch(setHasEdited(true));
		}
		setEditedDescription(newDescription);
		dispatch(setEditingField({ field: 'description', value: false }));
	};

	return (
		<div className="description-icon element-icon">
			{!isEditingField.description && <span>{editedDescription}</span>}
			{isEditingField.description && (
				<>
					<textarea
						className="task-edit-description"
						defaultValue={editedDescription}
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
			{!isEditingField.description && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditDescription(e)}></span>
			)}
		</div>
	);
};

export default EditDescription;
