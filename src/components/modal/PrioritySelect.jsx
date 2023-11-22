import React from 'react';
import ArrowDown from './ArrowDown';

const PrioritySelect = ({ taskPriority, setTaskPriority }) => {
	return (
		<div className="relative sm:ml-2 w-full sm:w-1/2">
			<select
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
				name="priority"
				onChange={(e) => setTaskPriority(e.target.value)}
				value={taskPriority}>
				<option value="default" disabled>
					Priorité
				</option>
				<option value="Low">Faible</option>
				<option value="Medium">Moyenne</option>
				<option value="High">Haute</option>
				<option value="Urgent">Urgent</option>
			</select>
			<ArrowDown />
		</div>
	);
};

export default PrioritySelect;
