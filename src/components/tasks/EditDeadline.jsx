import React, { useEffect, useRef, useState } from 'react';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditDeadline = ({ editedDeadline, setEditedDeadline }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const inputDeadlineRef = useRef(null);
	const [convertedDeadline, setConvertedDeadline] = useState('');

	const handleEditDeadline = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({
				field: 'deadline',
				value: !isEditingField.deadline,
			})
		);
	};

	const handleValidDeadline = (e) => {
		e.stopPropagation();
		const newDeadline = inputDeadlineRef.current.value;
		if (editedDeadline !== newDeadline) {
			dispatch(setHasEdited(true));
		}
		setEditedDeadline(newDeadline);
		dispatch(setEditingField({ field: 'deadline', value: false }));
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
			{!isEditingField.deadline && <span>{convertedDeadline}</span>}
			{isEditingField.deadline && (
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
			{!isEditingField.deadline && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditDeadline(e)}></span>
			)}
		</div>
	);
};

export default EditDeadline;
