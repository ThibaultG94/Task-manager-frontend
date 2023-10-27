import React from 'react';
import ArrowDown from './ArrowDown';

const PrioritySelect = ({ taskPriority, setTaskPriority }) => {
	return (
		<div className="relative w-1/2 pl-2">
			<select
				name="priority"
				value={taskPriority}
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
				onChange={(e) => setTaskPriority(e.target.value)}>
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
