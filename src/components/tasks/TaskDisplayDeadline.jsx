import React, { useEffect, useState } from 'react';
import { frenchFormattedDate } from '../utils/frenchFormattedDate';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayDeadline = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedDeadline, setConvertedDeadline] = useState('');

	useEffect(() => {
		const fetchConvertedDeadline = async () => {
			const deadline = await frenchFormattedDate(editedTask?.deadline);
			setConvertedDeadline(deadline);
		};

		fetchConvertedDeadline();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			<div
				className={
					'deadline-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
					editedTask?.category
				}>
				<span className="ml-2 text-lg">{convertedDeadline}</span>
			</div>
		</div>
	);
};

export default TaskDisplayDeadline;
