import React from 'react';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const DisplayTitle = () => {
	const editedTask = useSelector(selectEditedTask);

	return (
		<div className="mb-6">
			<div className="text-center">
				<p className="mt-3 text-2xl font-normal flex-grow">
					{editedTask?.title}
				</p>
			</div>
		</div>
	);
};

export default DisplayTitle;
