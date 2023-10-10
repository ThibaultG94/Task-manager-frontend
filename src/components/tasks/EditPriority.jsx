import React, { useEffect, useRef, useState } from 'react';
import { convertPriority } from '../utils/convertPriority';

const EditPriority = ({
	editState,
	setEditState,
	editedPriority,
	setEditedPriority,
}) => {
	const [isEditingPriority, setIsEditingPriority] = useState(false);
	const handleEditPriority = (e) => {
		e.stopPropagation();
		setIsEditingPriority(!isEditingPriority);
	};
	const inputPriorityRef = useRef(null);
	const [convertedPriority, setConvertedPriority] = useState('');

	const handleValidPriority = (e) => {
		e.stopPropagation();
		const newPriority = inputPriorityRef.current.value;
		editedPriority !== newPriority
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedPriority(newPriority);
		setIsEditingPriority(false);
	};

	useEffect(() => {
		const fetchConvertedPriority = async () => {
			const priority = await convertPriority(editedPriority);
			setConvertedPriority(priority);
		};

		fetchConvertedPriority();
	}, [editedPriority]);

	return (
		<div className="priority-icon element-icon">
			{!isEditingPriority && <span>{convertedPriority}</span>}
			{isEditingPriority && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedPriority}
						ref={inputPriorityRef}>
						<option value="Low">Faible</option>
						<option value="Medium">Moyenne</option>
						<option value="High">Haute</option>
						<option value="Urgent">Urgent</option>
					</select>
					<button onClick={(e) => handleValidPriority(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditPriority(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingPriority && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditPriority(e)}></span>
			)}
		</div>
	);
};

export default EditPriority;
