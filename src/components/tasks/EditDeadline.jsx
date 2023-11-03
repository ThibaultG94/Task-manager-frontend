import React, { useEffect, useRef, useState } from 'react';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditDeadline = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
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
		if (editedTask.deadline !== newDeadline) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ deadline: newDeadline }));
		}
		dispatch(setEditingField({ field: 'deadline', value: false }));
	};

	useEffect(() => {
		const fetchConvertedDeadline = async () => {
			const deadline = await frenchFormattedDate(editedTask?.deadline);
			setConvertedDeadline(deadline);
		};

		fetchConvertedDeadline();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			{!isEditingField.deadline && (
				<div
					className={
						'deadline-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
						editedTask?.category
					}>
					<span className="ml-3 text-xl">{convertedDeadline}</span>
				</div>
			)}
			{isEditingField.deadline && (
				<>
					<input
						type="date"
						className="task-edit-date"
						defaultValue={editedTask?.deadline}
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
			{/* {!isEditingField.deadline && (
				<span
				className="edit-icon"
				onClick={(e) => handleEditDeadline(e)}></span>
			)} */}
		</div>
	);
};

export default EditDeadline;
