import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditComments = ({ editedComments, setEditedComments }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const [isEditingComments, setIsEditingComments] = useState(false);
	const inputCommentsRef = useRef(null);

	const handleEditComments = (e) => {
		e.stopPropagation();
		setIsEditingComments(!isEditingComments);
		dispatch(
			setEditingField({
				field: 'comments',
				value: !isEditingField.comments,
			})
		);
	};

	const handleValidComments = (e) => {
		e.stopPropagation();
		const newComments = inputCommentsRef.current.value;
		if (editedComments !== newComments) {
			dispatch(setHasEdited(true));
		}
		setEditedComments(newComments);
		setIsEditingComments(false);
		dispatch(setEditingField({ field: 'comments', value: false }));
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
