import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditComments = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
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
		if (editedTask.comments !== newComments) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ comments: newComments }));
		}
		dispatch(setEditingField({ field: 'comments', value: false }));
	};

	return (
		<div className="flex flex-wrap mb-2">
			{isEditingField.comments && (
				<div className="comments-icon mt-2 ml-6 px-2 py-1 rounded-lg">
					<span className="ml-2 text-lg">{editedTask?.comments}</span>
				</div>
			)}
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
			{/* {!isEditingField.comments && (
						<span
							className="edit-icon"
							onClick={(e) => handleEditComments(e)}></span>
					)} */}
		</div>
	);
};

export default EditComments;
