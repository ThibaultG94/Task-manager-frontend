import React, { useEffect } from 'react';
import ArrowDown from './ArrowDown';

const MemberSelect = ({
	selectedMember,
	setSelectedMember,
	workspaceMembers,
}) => {
	useEffect(() => {
		if (workspaceMembers && workspaceMembers.length === 1) {
			setSelectedMember(workspaceMembers[0]._id);
		}
	}, [workspaceMembers, setSelectedMember]);

	return (
		<div className="md:mr-2 relative w-full md:w-1/2">
			<select
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
				id="assignedTo"
				name="assignedTo"
				onChange={(e) => setSelectedMember(e.target.value)}
				value={selectedMember}>
				<option value="default" disabled>
					Sélectionnez l'utilisateur en charge de la tâche
				</option>
				{workspaceMembers &&
					workspaceMembers.map((member) => (
						<option key={member._id} value={member._id}>
							{member.username}
						</option>
					))}
			</select>
			<ArrowDown />
		</div>
	);
};

export default MemberSelect;
