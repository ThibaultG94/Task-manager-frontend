import React from 'react';
import ArrowDown from './ArrowDown';

const MemberSelect = ({
	selectedMember,
	setSelectedMember,
	workspaceMembers,
}) => {
	return (
		<div className="relative w-1/2 pl-2">
			<select
				name="assignedTo"
				id="assignedTo"
				value={selectedMember}
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
				onChange={(e) => setSelectedMember(e.target.value)}>
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
