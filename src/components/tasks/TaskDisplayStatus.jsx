import React, { useEffect, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayStatus = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedStatus, setConvertedStatus] = useState('');

	useEffect(() => {
		const fetchConvertedStatus = async () => {
			const status = await convertStatus(editedTask?.status);
			setConvertedStatus(status);
		};

		fetchConvertedStatus();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			<div
				className={
					'status-icon mt-2 px-2 py-1 rounded-lg ' + convertedStatus
				}>
				<span className="ml-2 text-lg">{convertedStatus}</span>
			</div>
		</div>
	);
};

export default TaskDisplayStatus;
