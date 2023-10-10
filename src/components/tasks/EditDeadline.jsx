import React, { useEffect, useRef, useState } from 'react';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';

const EditDeadline = ({
	editState,
	setEditState,
	editedDeadline,
	setEditedDeadline,
}) => {
	const [isEditingDeadline, setIsEditingDeadline] = useState(false);
	const handleEditDeadline = (e) => {
		e.stopPropagation();
		setIsEditingDeadline(!isEditingDeadline);
	};
	const inputDeadlineRef = useRef(null);
	const [convertedDeadline, setConvertedDeadline] = useState('');

	const handleValidDeadline = (e) => {
		e.stopPropagation();
		const newDeadline = inputDeadlineRef.current.value;
		editedDeadline !== newDeadline
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedDeadline(newDeadline);
		setIsEditingDeadline(false);
	};

	useEffect(() => {
		const fetchConvertedDeadline = async () => {
			const deadline = await frenchFormattedDate(editedDeadline);
			setConvertedDeadline(deadline);
		};

		fetchConvertedDeadline();
	}, [editedDeadline]);

	return (
		<div className="deadline-icon element-icon">
			{!isEditingDeadline && <span>{convertedDeadline}</span>}
			{isEditingDeadline && (
				<>
					<input
						type="date"
						class="task-edit-date"
						defaultValue={editedDeadline}
						ref={inputDeadlineRef}
					/>
					<button onClick={(e) => handleValidDeadline(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditDeadline(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingDeadline && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditDeadline(e)}></span>
			)}
		</div>
	);
};

export default EditDeadline;
