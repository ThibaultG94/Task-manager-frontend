import React from 'react';
import ArrowDown from './ArrowDown';

const StatusSelect = ({ taskStatus, setTaskStatus }) => {
	return (
		<div className="mb-2 sm:mb-0 relative w-full sm:w-1/2">
			<select
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
				name="status"
				onChange={(e) => setTaskStatus(e.target.value)}
				value={taskStatus}>
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
