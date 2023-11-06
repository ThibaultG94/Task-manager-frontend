import React, { useEffect, useState } from 'react';
import { convertPriority } from '../utils/convertPriority';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayPriority = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedPriority, setConvertedPriority] = useState('');

	useEffect(() => {
		const fetchConvertedPriority = async () => {
			const priority = await convertPriority(editedTask?.priority);
			setConvertedPriority(priority);
		};

		fetchConvertedPriority();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			<div
				className={
					'priority-icon mt-2 ml-6 px-2 py-1 rounded-lg ' +
					convertedPriority
				}>
				<span className="ml-2 text-lg">{convertedPriority}</span>
			</div>
		</div>
	);
};

export default TaskDisplayPriority;
