import React, { useEffect, useRef, useState } from 'react';

const EditTitle = ({ setEditState, editedTitle, setEditedTitle }) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const handleEditTitle = (e) => {
		e.stopPropagation();
		setIsEditingTitle(!isEditingTitle);
	};
	const inputTitleRef = useRef(null);

	useEffect(() => {
		if (isEditingTitle) {
			inputTitleRef.current.focus();
		}
	}, [isEditingTitle]);

	const handleValidTitle = (e) => {
		e.stopPropagation();
		const newTitle = inputTitleRef.current.value;
		setEditedTitle(newTitle);
		setIsEditingTitle(false);
		setEditState({
			isEditing: false,
			hasEdited: true,
		});
	};

	return (
		<div className="title-icon relative">
			{!isEditingTitle && (
				<h2 className="pt-2 text-2xl font-bold">{editedTitle}</h2>
			)}
			{isEditingTitle && (
				<>
					<input
						type="text"
						className="task-edit-title pt-2 text-2xl"
						defaultValue={editedTitle}
						ref={inputTitleRef}
					/>
					<button
						className="save-title absolute right-20"
						onClick={(e) => handleValidTitle(e)}>
						Valider
					</button>
					<button
						className="absolute right-0"
						onClick={(e) => handleEditTitle(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingTitle && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditTitle(e)}></span>
			)}
		</div>
	);
};

export default EditTitle;
