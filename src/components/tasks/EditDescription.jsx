import React, { useEffect, useRef, useState } from 'react';

const EditDescription = ({
	editState,
	setEditState,
	editedDescription,
	setEditedDescription,
}) => {
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const handleEditDescription = (e) => {
		e.stopPropagation();
		setIsEditingDescription(!isEditingDescription);
	};
	const inputDescriptionRef = useRef(null);

	useEffect(() => {
		if (isEditingDescription) {
			inputDescriptionRef.current.focus();
		}
	}, [isEditingDescription]);

	const handleValidDescription = (e) => {
		e.stopPropagation();
		const newDescription = inputDescriptionRef.current.value;
		editedDescription !== newDescription
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedDescription(newDescription);
		setIsEditingDescription(false);
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
