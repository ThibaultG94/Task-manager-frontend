import React, { useEffect, useRef, useState } from 'react';
import { convertPriority } from '../utils/convertPriority';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditPriority = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputPriorityRef = useRef(null);
	const [convertedPriority, setConvertedPriority] = useState('');

	const handleEditPriority = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({
				field: 'priority',
				value: !isEditingField.priority,
			})
		);
	};

	const handleValidPriority = (e) => {
		e.stopPropagation();
		const newPriority = inputPriorityRef.current.value;
		if (editedTask.priority !== newPriority) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ priority: newPriority }));
		}
		dispatch(setEditingField({ field: 'priority', value: false }));
	};

	useEffect(() => {
		const fetchConvertedPriority = async () => {
			const priority = await convertPriority(editedTask?.priority);
			setConvertedPriority(priority);
		};

		fetchConvertedPriority();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			{!isEditingField.priority && (
				<div
					className={
						'priority-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
						convertedPriority
					}>
					<span className="ml-2 text-lg">{convertedPriority}</span>
				</div>
			)}
			{isEditingField.priority && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedTask?.priority}
						ref={inputPriorityRef}>
						<option value="Low">Faible</option>
						<option value="Medium">Moyenne</option>
						<option value="High">Haute</option>
						<option value="Urgent">Urgent</option>
					</select>
					<button onClick={(e) => handleValidPriority(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditPriority(e)}>
						Annuler
					</button>
				</>
			)}
			{/* {!isEditingField.priority && (
				<span
				className="edit-icon"
				onClick={(e) => handleEditPriority(e)}></span>
			)} */}
		</div>
	);
};

export default EditPriority;
