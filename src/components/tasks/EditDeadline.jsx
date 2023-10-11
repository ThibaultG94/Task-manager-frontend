import React, { useEffect, useRef, useState } from 'react';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditing } from '../../store/selectors/editStateSelectors';
import { setEditing, setHasEdited } from '../../store/feature/editState.slice';

const EditDeadline = ({ editedDeadline, setEditedDeadline }) => {
	const dispatch = useDispatch();
	const isEditing = useSelector(selectIsEditing);
	const [isEditingDeadline, setIsEditingDeadline] = useState(false);
	const inputDeadlineRef = useRef(null);
	const [convertedDeadline, setConvertedDeadline] = useState('');

	const handleEditDeadline = (e) => {
		e.stopPropagation();
		setIsEditingDeadline(!isEditingDeadline);
		dispatch(setEditing(!isEditing));
	};

	const handleValidDeadline = (e) => {
		e.stopPropagation();
		const newDeadline = inputDeadlineRef.current.value;
		if (editedDeadline !== newDeadline) {
			dispatch(setHasEdited(true));
		}
		setEditedDeadline(newDeadline);
		setIsEditingDeadline(false);
		dispatch(setEditing(false));
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
						className="task-edit-date"
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
