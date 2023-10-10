import React, { useRef, useState } from 'react';

const EditComments = ({
	editState,
	setEditState,
	editedComments,
	setEditedComments,
}) => {
	const [isEditingComments, setIsEditingComments] = useState(false);
	const handleEditComments = (e) => {
		e.stopPropagation();
		setIsEditingComments(!isEditingComments);
	};
	const inputCommentsRef = useRef(null);

	const handleValidComments = (e) => {
		e.stopPropagation();
		const newComments = inputCommentsRef.current.value;
		editedComments !== newComments
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedComments(newComments);
		setIsEditingComments(false);
	};

	return (
		<div>
			{isEditingComments && (
				<div className="comments-icon element-icon">
					<span>{editedComments}</span>
					{isEditingComments && (
						<>
							<textarea
								class="task-edit-comments"
								ref={inputCommentsRef}></textarea>
							<button onClick={(e) => handleValidComments(e)}>
								Valider
							</button>
							<button onClick={(e) => handleEditComments(e)}>
								Annuler
							</button>
						</>
					)}
					{!isEditingComments && (
						<span
							className="edit-icon"
							onClick={(e) => handleEditComments(e)}></span>
					)}
				</div>
			)}
		</div>
	);
};

export default EditComments;
