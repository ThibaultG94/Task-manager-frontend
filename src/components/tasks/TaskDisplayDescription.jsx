import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayDescription = () => {
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputDescriptionRef = useRef(null);

	useEffect(() => {
		if (isEditingField.description) {
			inputDescriptionRef.current.focus();
		}
	}, [isEditingField.description]);

	return (
		<div className="flex flex-wrap mb-2">
			<div className="description-icon px-2 py-1 rounded-lg">
				<span className="ml-2 text-lg">{editedTask?.description}</span>
			</div>
		</div>
	);
};

export default TaskDisplayDescription;
