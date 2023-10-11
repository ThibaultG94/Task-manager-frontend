import React, { useEffect, useRef, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditStatus = ({ editedStatus, setEditedStatus }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
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
		if (editedStatus !== newStatus) {
			dispatch(setHasEdited(true));
		}
		setEditedStatus(newStatus);
		dispatch(setEditingField({ field: 'status', value: false }));
	};

	useEffect(() => {
		const fetchConvertedStatus = async () => {
			const status = await convertStatus(editedStatus);
			setConvertedStatus(status);
		};

		fetchConvertedStatus();
	}, [editedStatus]);

	return (
		<div className="status-icon element-icon">
			{!isEditingField.status && <span>{convertedStatus}</span>}
			{isEditingField.status && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedStatus}
						ref={inputStatusRef}>
						<option value="Pending">À faire</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
					<button onClick={(e) => handleValidStatus(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditStatus(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingField.status && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditStatus(e)}></span>
			)}
		</div>
	);
};

export default EditStatus;
