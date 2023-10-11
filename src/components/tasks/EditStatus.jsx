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
	const [isEditingStatus, setIsEditingStatus] = useState(false);
	const inputStatusRef = useRef(null);
	const [convertedStatus, setConvertedStatus] = useState('');

	const handleEditStatus = (e) => {
		e.stopPropagation();
		setIsEditingStatus(!isEditingStatus);
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
		setIsEditingStatus(false);
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
			{!isEditingStatus && <span>{convertedStatus}</span>}
			{isEditingStatus && (
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
			{!isEditingStatus && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditStatus(e)}></span>
			)}
		</div>
	);
};

export default EditStatus;
