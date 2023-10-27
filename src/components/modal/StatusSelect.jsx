import React from 'react';
import ArrowDown from './ArrowDown';

const StatusSelect = ({ taskStatus, setTaskStatus }) => {
	return (
		<div className="relative w-1/2">
			<select
				name="status"
				value={taskStatus}
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
				onChange={(e) => setTaskStatus(e.target.value)}>
				<option value="default" disabled>
					Status
				</option>
				<option value="Pending">À faire</option>
				<option value="In Progress">En cours</option>
				<option value="Completed">Terminé</option>
				<option value="Archived">Archivé</option>
			</select>
			<ArrowDown />
		</div>
	);
};

export default StatusSelect;
