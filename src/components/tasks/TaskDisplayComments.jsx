import React from 'react';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayComments = () => {
	const editedTask = useSelector(selectEditedTask);

	return (
		<div className="flex flex-wrap mb-2">
			<div className="comments-icon mt-2 ml-6 px-2 py-1 rounded-lg">
				<span className="ml-2 text-lg">{editedTask?.comments}</span>
			</div>
		</div>
	);
};

export default TaskDisplayComments;
