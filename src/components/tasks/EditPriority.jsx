import React, { useEffect, useRef, useState } from 'react';
import { convertPriority } from '../utils/convertPriority';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditPriority = ({ editedPriority, setEditedPriority }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
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
		if (editedPriority !== newPriority) {
			dispatch(setHasEdited(true));
		}
		setEditedPriority(newPriority);
		dispatch(setEditingField({ field: 'priority', value: false }));
	};

	useEffect(() => {
		const fetchConvertedPriority = async () => {
			const priority = await convertPriority(editedPriority);
			setConvertedPriority(priority);
		};

		fetchConvertedPriority();
	}, [editedPriority]);

	return (
		<div className="priority-icon element-icon">
			{!isEditingField.priority && <span>{convertedPriority}</span>}
			{isEditingField.priority && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedPriority}
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
			{!isEditingField.priority && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditPriority(e)}></span>
			)}
		</div>
	);
};

export default EditPriority;
