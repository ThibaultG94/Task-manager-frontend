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
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
	);
};

export default DeadlineInput;
