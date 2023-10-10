import React, { useEffect, useRef, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';

const EditStatus = ({
	editState,
	setEditState,
	editedStatus,
	setEditedStatus,
}) => {
	const [isEditingStatus, setIsEditingStatus] = useState(false);
	const handleEditStatus = (e) => {
		e.stopPropagation();
		setIsEditingStatus(!isEditingStatus);
	};
	const inputStatusRef = useRef(null);
	const [convertedStatus, setConvertedStatus] = useState('');

	const handleValidStatus = (e) => {
		e.stopPropagation();
		const newStatus = inputStatusRef.current.value;
		editedStatus !== newStatus
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedStatus(newStatus);
		setIsEditingStatus(false);
	};

	useEffect(() => {
		const fetchConvertedStatus = async () => {
			const status = await convertStatus(editedStatus);
			setConvertedStatus(status);
		};

		fetchConvertedStatus();
	}, [editedStatus]);

	return (
		<div className="status-icon element-icon">
			{!isEditingStatus && <span>{convertedStatus}</span>}
			{isEditingStatus && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedStatus}
						ref={inputStatusRef}>
						<option value="Pending">À faire</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
					<button onClick={(e) => handleValidStatus(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditStatus(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingStatus && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditStatus(e)}></span>
			)}
		</div>
	);
};

export default EditStatus;
