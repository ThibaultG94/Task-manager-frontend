import React, { useEffect, useRef, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';
import ValidOrCancelButtonsInEditingMode from './ValidOrCancelButtonsInEditingMode';
import EditIcon from './EditIcon';

const EditStatus = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputStatusRef = useRef(null);
	const [convertedStatus, setConvertedStatus] = useState('');

	const handleEditStatus = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({ field: 'status', value: !isEditingField.status })
		);
	};

	const handleValidStatus = (e) => {
		e.stopPropagation();
		const newStatus = inputStatusRef.current.value;
		if (editedTask.status !== newStatus) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ status: newStatus }));
		}
		dispatch(setEditingField({ field: 'status', value: false }));
	};

	useEffect(() => {
		const fetchConvertedStatus = async () => {
			const status = await convertStatus(editedTask?.status);
			setConvertedStatus(status);
		};

		fetchConvertedStatus();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			{!isEditingField.status && (
				<div
					className={
						'status-icon mt-2 px-2 py-1 rounded-lg ' +
						convertedStatus
					}>
					<span className="ml-2 text-lg">{convertedStatus}</span>
				</div>
			)}
			{isEditingField.status && (
				<div className="status-icon">
					<select
						className="task-edit-select ml-4"
						defaultValue={editedTask?.status}
						ref={inputStatusRef}>
						<option value="Pending">À faire</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
					<ValidOrCancelButtonsInEditingMode
						handleValidElement={handleValidStatus}
						handleEditElement={handleEditStatus}
					/>
				</div>
			)}
			{/* {!isEditingField.status && (
				<EditIcon handleEditElement={handleEditStatus} />
			)} */}
		</div>
	);
};

export default EditStatus;
