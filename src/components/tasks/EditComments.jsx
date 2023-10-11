import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditComments = ({ editedComments, setEditedComments }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const inputCommentsRef = useRef(null);

	const handleEditComments = (e) => {
		e.stopPropagation();
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
		dispatch(setEditingField({ field: 'comments', value: false }));
	};

	return (
		<div>
			{isEditingField.comments && (
				<div className="comments-icon element-icon">
					<span>{editedComments}</span>
					{isEditingField.comments && (
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
					{!isEditingField.comments && (
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
