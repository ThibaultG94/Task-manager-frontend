import React, { useEffect } from 'react';

const DeadlineInput = ({ taskDeadline, setTaskDeadline }) => {
	useEffect(() => {
		const today = new Date();
		const formattedToday = `${today.getFullYear()}-${String(
			today.getMonth() + 1
		).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		setTaskDeadline(formattedToday);
	}, []);

	return (
		<div>
			<input
				value={taskDeadline}
				onChange={(e) => setTaskDeadline(e.target.value)}
				type="date"
				name="deadline"
				placeholder="Date d'échéance"
				defaultValue={taskDeadline}
				className="w-full p-2 border border-gray-300 rounded"
			/>
		</div>
	);
};

export default DeadlineInput;
