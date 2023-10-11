import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditDescription = ({ editedDescription, setEditedDescription }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const inputDescriptionRef = useRef(null);

	const handleEditDescription = (e) => {
		e.stopPropagation();
		setIsEditingDescription(!isEditingDescription);
		dispatch(
			setEditingField({
				field: 'description',
				value: !isEditingField.description,
			})
		);
	};

	useEffect(() => {
		if (isEditingDescription) {
			inputDescriptionRef.current.focus();
		}
	}, [isEditingDescription]);

	const handleValidDescription = (e) => {
		e.stopPropagation();
		const newDescription = inputDescriptionRef.current.value;
		if (editedDescription !== newDescription) {
			dispatch(setHasEdited(true));
		}
		setEditedDescription(newDescription);
		setIsEditingDescription(false);
		dispatch(setEditingField({ field: 'description', value: false }));
	};

	return (
		<div className="description-icon element-icon">
			{!isEditingDescription && <span>{editedDescription}</span>}
			{isEditingDescription && (
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
			{!isEditingDescription && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditDescription(e)}></span>
			)}
		</div>
	);
};

export default EditDescription;
